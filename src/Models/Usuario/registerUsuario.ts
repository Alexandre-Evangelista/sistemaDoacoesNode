import { Point } from "geojson";

export interface Usuario{
    email: string;
    geolocalizacao?:Point; 
    foto?: string | null;
    tipo?: boolean | null;
    senha: string;
    telefone?: string | null;
    nome: string;
    cpf?: string | null;
    cnpj?: string | null;
    
}
