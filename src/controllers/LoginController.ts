import { Request, Response } from 'express';
import connection from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hash = process.env.HASH_JWT as string

class LoginController {
    async create(req: Request, res: Response) {
        const { username, passwordUser } = req.body;

        try {
            const user = await connection('users').where({ username }).first();

            if (!user) {
                return res.status(400).json({ mensagem: "USERNAME e/ou SENHA inválidos." });
            }

            const correctPassword = await bcrypt.compare(passwordUser, user.passworduser);

            if (!correctPassword) {
                return res.status(400).json({ mensagem: "USERNAME e/ou SENHA inválidos." });
            }

            const token = jwt.sign({ id: user.id }, hash, { expiresIn: '24h' });

            const { passworduser: _, ...userData } = user;

            return res.status(200).json({
                user: userData,
                token
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    }
}

export { LoginController };