import { Request, Response } from 'express';
import connection from '../database/connection';
import bcrypt from 'bcrypt';

class UserController {
    async create(req: Request, res: Response) {
        const { username, passwordUser } = req.body;

        try {
            const user = await connection('users').where({ username }).first();

            if (user) {
                return res.status(400).json({ mensagem: "USERNAME já existente. Por favor, insira um diferente." });
            }

            const encryptedPassword = await bcrypt.hash(passwordUser, 10);

            const accountUser = await connection('accounts').insert({
                balance: 10000
            }).returning('*');

            if (!accountUser[0]) {
                return res.status(500).json({ mensagem: "Erro interno do servidor." });
            }

            const registeredUser = await connection('users').insert({
                username,
                passworduser: encryptedPassword,
                accountid: accountUser[0].id
            }).returning(['id', 'username', 'accountid']);

            if (!registeredUser) {
                return res.status(500).json({ mensagem: "Erro interno do servidor." });
            }

            return res.status(201).json(registeredUser[0]);

        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}

export { UserController };