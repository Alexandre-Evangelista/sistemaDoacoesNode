import {PrismaClient} from '@prisma/client';
import type { Usuario,ONG,Campanha,Avaliacao,Doacao } from '@prisma/client';
  
  const prisma = new PrismaClient();
  
  
export {prisma}