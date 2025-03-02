
import { Point } from "geojson";
export interface ONG {
    cnpj: string;
    nome: string;
    geolocalizacao?: Point;
    foto?: string ;
    descricao?: string ;
    telefone: string;
    senha: string;
    
  }