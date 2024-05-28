/*
  Warnings:

  - Made the column `recipeId` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Made the column `recipeId` on table `Step` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "recipeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "recipeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
