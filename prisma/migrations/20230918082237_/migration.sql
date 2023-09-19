-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Categories" (
    "category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Subcategories" (
    "subcategory_id" TEXT NOT NULL,
    "subcategory_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT,

    CONSTRAINT "Subcategories_pkey" PRIMARY KEY ("subcategory_id")
);

-- CreateTable
CREATE TABLE "Subsubcategories" (
    "subsubcategory_id" TEXT NOT NULL,
    "subsubcategory_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subcategory_id" TEXT,

    CONSTRAINT "Subsubcategories_pkey" PRIMARY KEY ("subsubcategory_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subsubcategory_id" TEXT,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone_number" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_name_key" ON "Categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategories_subcategory_name_key" ON "Subcategories"("subcategory_name");

-- CreateIndex
CREATE UNIQUE INDEX "Subsubcategories_subsubcategory_name_key" ON "Subsubcategories"("subsubcategory_name");

-- CreateIndex
CREATE UNIQUE INDEX "Products_product_name_key" ON "Products"("product_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Subcategories" ADD CONSTRAINT "Subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subsubcategories" ADD CONSTRAINT "Subsubcategories_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategories"("subcategory_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_subsubcategory_id_fkey" FOREIGN KEY ("subsubcategory_id") REFERENCES "Subsubcategories"("subsubcategory_id") ON DELETE SET NULL ON UPDATE CASCADE;
