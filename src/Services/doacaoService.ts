import { prisma } from "../Database/repository.js";

class DoacaoService{
    async criarDoacao(data: Doacao){
    
        const doacao = await prisma.doacao.create({
            data: {
                datadoacao: data.datadoacao,
                quantidade: data.quantidade,
                tipo: data.tipo,
                email: data.email,
                cnpj: data.cnpj ?? null,
                IDcampanha: data.IDcampanha ?? null,
            },
        });
        return doacao
    }
    async listarTodasDoacoes() {
        try {
            const doacoes = await prisma.doacao.findMany();
            return { status: 200, body: doacoes };
        } catch (error) {
            console.error(error);
            return { status: 500, body: "Erro ao listar as doações." };
        }
    }

    async buscarDoacaoPorId(id: string, email?: string) {
        const doacao = await prisma.doacao.findUnique({
                where: { id, email},
            });
        return doacao;
    }
    async buscarDoacaoDoUsuario(email: string) {
        const doacao = await prisma.doacao.findMany({
                where: { email }
            });
        return doacao;
    }

    async updateDoacao(id: string, email:string, data:Omit<Doacao,"id"|"email">){
        const doacao = await prisma.doacao.update({
            where:{id,email},
            data: {
                datadoacao: data.datadoacao,
                quantidade: data.quantidade,
                tipo: data.tipo,
                email: email,
                cnpj: data.cnpj ?? null,
                IDcampanha: data.IDcampanha ?? null,
            },
        })
        return doacao;
    }

    async deletarDoacao(id: string){
        const doacaoDeletada = await prisma.doacao.delete({
            where: {id},
        })
        return doacaoDeletada;
    }
}   

export default new DoacaoService()