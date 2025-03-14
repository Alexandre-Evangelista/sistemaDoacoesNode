import { z } from "zod";

import { CreateONG } from "../Models/Usuario/registerOng.js";


export function validateZodOng(ong: Omit<CreateONG,"foto">){
    const cnpjRegex = /^\d{2}\.?(\d{3})\.?(\d{3})\/?(\d{4})-?(\d{2})$/;
    const telefoneRegex = /^(\(?\d{2}\)?\s?)?(9\d{4})-?(\d{4})$/;

    const ongSchema = z.object({
        cnpj: z.string().regex(cnpjRegex,"Cnpj Invalido"),
        nome: z.string().min(3,"o nome deve ser acima de 3 caracteres"),
        geolocalizacao: z.object({
            type: z.literal("Point"),
            coordinates: z.tuple([z.number(), z.number()])
        }).optional(),
        descricao: z.string().optional(),
        telefone: z.string().regex(telefoneRegex,"Formato invalido de telefone"),
        senha:  z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    })
    const result = ongSchema.safeParse(ong);
    return result;
}