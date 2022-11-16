import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection';
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}

export const authenticationFilter = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado. Por favor, efetue o login." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, process.env.HASH_JWT ?? '') as JwtPayload;

        const user = await connection('users').where({ id }).first();

        if (!user) {
            return res.status(401).json({mensagem: "Não autorizado. Por favor, efetue o login."});
        }

        const {passworduser: _, ...userData} = user;

        req.user = userData;
        
        next();

    } catch (error) {
        return res.status(401).json({ mensagem: "Não autorizado. Por favor, efetue o login." });
    }
}