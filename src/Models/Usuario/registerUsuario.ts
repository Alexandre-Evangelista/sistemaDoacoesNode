import { prisma } from "../../Database/repository";
import { Point } from "geojson";


type params={cnpj: string;
    nome: string;
    geolocalizacao: Point; // PostGIS geometry type
    foto?: string | null;
    descricao?: string | null;
    telefone: string;}