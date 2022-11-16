import { Request, Response } from 'express';
import connection from '../database/connection';

type UserId = {
    id: number
}

type AccountId = {
    accountid: number
}

class TransactionController {
    async create(req: Request, res: Response) {
        const { id } = req.user as UserId;
        const { username, valueTransaction } = req.body;

        try {
            const homeUser = await connection('users').where({ id }).first();

            if (!homeUser) {
                return res.status(404).json({ mensagem: "Usuário de origem não encontrado. Por favor, faça novamente o login." });
            }

            const targetUser = await connection('users').where({ username }).first();

            if (!targetUser) {
                return res.status(404).json({ mensagem: "Não existe usuário com uma conta bancária cadastrada com esse USERNAME. Por favor, verifique se digitou corretamente." });
            }

            if (homeUser.id === targetUser.id) {
                return res.status(404).json({ mensagem: "Não é possível fazer uma transferência para a sua própria conta." });
            }

            const accountUser = await connection('accounts').where({ id: homeUser.accountid }).first();

            const accountTargetUser = await connection('accounts').where({ id: targetUser.accountid }).first();

            if (Number(accountUser.balance) - valueTransaction < 0) {
                return res.status(404).json({ mensagem: "Seu saldo é insuficiente." });
            }

            const transfer = await connection('transactions').insert({
                debitedaccountid: homeUser.accountid,
                creditedaccountid: targetUser.accountid,
                valuetransaction: Number(valueTransaction),
                createdat: new Date()
            }).returning('*');

            await connection('accounts').where({ id: homeUser.accountid }).update({
                balance: Number(accountUser.balance) - valueTransaction
            })

            await connection('accounts').where({ id: targetUser.accountid }).update({
                balance: Number(accountTargetUser.balance) + valueTransaction
            });

            return res.status(201).json(transfer[0]);

        } catch (error) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}

class ExtractController {
    async read(req: Request, res: Response) {
        const { accountid } = req.user as AccountId;

        try {
            const userExists = await connection('users').where({ accountid }).first();

            if (!userExists) {
                return res.status(400).json({ mensagem: "Esse usuário não existe no banco de dados do sistema." });
            }

            const transactionsDebitedUser = await connection('transactions').where({debitedaccountid: accountid});
            
            const transactionsCreditedUser = await connection('transactions').where({creditedaccountid: accountid});
            
            const extractUser = [...transactionsDebitedUser, ...transactionsCreditedUser];

            return res.status(200).json(extractUser);
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}

export { TransactionController, ExtractController }