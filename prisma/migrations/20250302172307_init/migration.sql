-- CreateTable
CREATE TABLE "Usuario" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "foto" TEXT,
    "tipo" BOOLEAN,
    "telefone" TEXT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "cnpj" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ONG" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "foto" TEXT,
    "descricao" TEXT,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "ONG_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Campanha" (
    "_id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "datacriacao" TIMESTAMP(3) NOT NULL,
    "cnpjOng" TEXT,

    CONSTRAINT "Campanha_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "_id" TEXT NOT NULL,
    "datadoacao" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "email" TEXT,
    "cnpj" TEXT,
    "IDcampanha" TEXT,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "_id" TEXT NOT NULL,
    "emailUsuario" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cnpj_key" ON "Usuario"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_emailUsuario_cnpj_key" ON "Avaliacao"("emailUsuario", "cnpj");

-- AddForeignKey
ALTER TABLE "Campanha" ADD CONSTRAINT "Campanha_cnpjOng_fkey" FOREIGN KEY ("cnpjOng") REFERENCES "ONG"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_email_fkey" FOREIGN KEY ("email") REFERENCES "Usuario"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "ONG"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_IDcampanha_fkey" FOREIGN KEY ("IDcampanha") REFERENCES "Campanha"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_emailUsuario_fkey" FOREIGN KEY ("emailUsuario") REFERENCES "Usuario"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "ONG"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
