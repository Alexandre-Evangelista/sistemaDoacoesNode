

export interface Usuario{
    email: string;
    geolocalizacao?:object; 
    foto?: string | null;
    tipo?: boolean | null;
    senha: string;
    telefone?: string | null;
    nome: string;
    cpf?: string | null;
    cnpj?: string | null;
    
}
