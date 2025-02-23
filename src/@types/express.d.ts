
// Tipo para o modelo Usuario
type Usuario = {
    email: string;
    geolocalizacao?: Point; //postgis
    foto?: string | null;
    tipo?: boolean | null;
    telefone?: string | null;
    nome: string;
    cpf?: string | null;
    cnpj?: string | null;
    avaliacoes: Avaliacao[];
    doacoes: Doacao[];
  };
  
  // Tipo para o modelo ONG
  type ONG = {
    cnpj: string;
    nome: string;
    geolocalizacao: Point; // PostGIS geometry type
    foto?: string | null;
    descricao?: string | null;
    telefone: string;
    campanhas: Campanha[];
    avaliacoes: Avaliacao[];
    doacoes: Doacao[];
  };
  
  // Tipo para o modelo Campanha
  type Campanha = {
    id: string;
    descricao: string;
    foto: string;
    geolocalizacao: Point; // PostGIS geometry type
    datacriacao: Date;
    cnpjOng?: string | null;
    ong?: ONG | null;
    doacoes: Doacao[];
  };
  
  // Tipo para o modelo Doacao
  type Doacao = {
    id: string;
    datadoacao: Date;
    quantidade: number;
    tipo: string;
    email?: string | null;
    cnpj?: string | null;
    IDcampanha?: string | null;
    usuario?: Usuario | null;
    ong?: ONG | null;
    campanha?: Campanha | null;
  };
  
  // Tipo para o modelo Avaliacao
  type Avaliacao = {
    emailUsuario: string;
    cnpj: string;
    feedback: string;
  
    usuario: Usuario;
    ong: ONG;
  };

  declare namespace Express{
    export interface Request{
        usuario:Usuario;

    }
  };