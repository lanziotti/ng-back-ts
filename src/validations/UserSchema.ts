import { z } from 'zod';

export const userSchema = z.object({
    username: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "USERNAME Inválido."
    })
        .min(3, "O USERNAME precisa ter, no mínimo, 3 caracteres."),
    passwordUser: z.string({
        required_error: "Todos os campos são obrigatórios.",
        invalid_type_error: "SENHA Inválida."
    })
        .min(8, "A SENHA precisa ter, no mínimo, 8 caracteres.")
});