-- CreateTable
CREATE EXTENSION postgis;

CREATE TABLE "Usuario" (
    "email" VARCHAR(256) NOT NULL,
    "geolocalizacao" geometry(Point,4326),
    "foto" VARCHAR(256),
    "tipo" BOOLEAN,
    "telefone" VARCHAR(11),
    "nome" VARCHAR(200) NOT NULL,
    "cpf" VARCHAR(11),
    "cnpj" VARCHAR(14),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "ONG" (
    "cnpj" VARCHAR(14) NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "geolocalizacao" geometry(Point,4326) NOT NULL,
    "foto" VARCHAR(256),
    "descricao" TEXT,
    "telefone" VARCHAR(11) NOT NULL,

    CONSTRAINT "ONG_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "Campanha" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "foto" VARCHAR(256) NOT NULL,
    "geolocalizacao" geometry(Point,4326) NOT NULL,
    "datacriacao" DATE NOT NULL,
    "cnpjOng" VARCHAR(14),

    CONSTRAINT "Campanha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" TEXT NOT NULL,
    "datadoacao" DATE NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "tipo" VARCHAR(200) NOT NULL,
    "email" VARCHAR(256),
    "cnpj" VARCHAR(14),
    "IDcampanha" TEXT,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "emailUsuario" VARCHAR(256) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("emailUsuario","cnpj")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cnpj_key" ON "Usuario"("cnpj");

-- AddForeignKey
ALTER TABLE "Campanha" ADD CONSTRAINT "Campanha_cnpjOng_fkey" FOREIGN KEY ("cnpjOng") REFERENCES "ONG"("cnpj") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_email_fkey" FOREIGN KEY ("email") REFERENCES "Usuario"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "ONG"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_IDcampanha_fkey" FOREIGN KEY ("IDcampanha") REFERENCES "Campanha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_emailUsuario_fkey" FOREIGN KEY ("emailUsuario") REFERENCES "Usuario"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "ONG"("cnpj") ON DELETE CASCADE ON UPDATE CASCADE;
