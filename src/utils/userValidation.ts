import { z } from 'zod';

import { Usuario } from '../Models/Usuario/registerUsuario.js';

export function validateZodUser(user: Omit<Usuario,"foto">){
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    const cnpjRegex = /^\d{2}\.?(\d{3})\.?(\d{3})\/?(\d{4})-?(\d{2})$/;
    const telefoneRegex = /^(\(?\d{2}\)?\s?)?(9\d{4})-?(\d{4})$/;
    

    const userSchema = z.object({
        cpf: z.string().regex(cpfRegex,"CPF invalido").optional(),
        nome: z.string().min(3),   
        email: z.string().email("E-mail inválido"), 
        senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        geolocalizacao: z.object({
            type: z.literal("Point"),
            coordinates: z.tuple([z.number(), z.number()])
        }).optional(),
        tipo: z.boolean().nullable().optional(),
        cnpj: z.string().regex(cnpjRegex, "CNPJ deve ter 14 caracteres").optional(),
        telefone: z.string().regex(telefoneRegex,"Numero Invalido").optional()

    })
    const result = userSchema.safeParse(user);// aqui tras todas as mensagens onde teve errors
    return result;  
}