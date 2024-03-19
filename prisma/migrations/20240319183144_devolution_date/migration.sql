/*
  Warnings:

  - Made the column `devolutionDate` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "lender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "devolutionDate" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Loan_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("amount", "date", "devolutionDate", "id", "itemId", "lender", "observation", "receiver") SELECT "amount", "date", "devolutionDate", "id", "itemId", "lender", "observation", "receiver" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
