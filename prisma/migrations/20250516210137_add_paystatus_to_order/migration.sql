-- CreateEnum
CREATE TYPE "PayStatus" AS ENUM ('UNPAID', 'PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payStatus" "PayStatus" NOT NULL DEFAULT 'UNPAID';
