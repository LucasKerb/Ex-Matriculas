-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professor" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "turno" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AlunoTurma" (
    "alunoId" INTEGER NOT NULL,
    "turmaId" INTEGER NOT NULL,

    PRIMARY KEY ("alunoId", "turmaId"),
    CONSTRAINT "AlunoTurma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunoTurma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
