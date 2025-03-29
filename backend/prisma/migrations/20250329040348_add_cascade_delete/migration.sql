-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlunoTurma" (
    "alunoId" INTEGER NOT NULL,
    "turmaId" INTEGER NOT NULL,

    PRIMARY KEY ("alunoId", "turmaId"),
    CONSTRAINT "AlunoTurma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunoTurma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AlunoTurma" ("alunoId", "turmaId") SELECT "alunoId", "turmaId" FROM "AlunoTurma";
DROP TABLE "AlunoTurma";
ALTER TABLE "new_AlunoTurma" RENAME TO "AlunoTurma";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
