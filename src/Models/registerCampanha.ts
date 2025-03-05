import { Point } from "geojson";

export interface Campanha {
    id:string;
    descricao:string;
    foto:string;
  
    geolocalizacao?: Point;
        
  }