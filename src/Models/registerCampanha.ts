import { Point } from "geojson";

export interface Campanha {
     id?: string;
  descricao: string;
  foto: string;
  latitude?: number;
  longitude?: number;
  cnpjOng?: string;
  datacriacao?: Date;
        
  }