-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "model" TEXT DEFAULT '{empty}',
    "serialNumber" TEXT DEFAULT '{empty}',
    "amount" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("amount", "categoryId", "id", "model", "name", "serialNumber") SELECT "amount", "categoryId", "id", "model", "name", "serialNumber" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
