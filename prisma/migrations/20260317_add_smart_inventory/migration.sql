-- AlterTable
ALTER TABLE "clients" ADD COLUMN "notes" TEXT;

-- CreateTable
CREATE TABLE "client_documents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "client_id" UUID,
    "file_name" TEXT,
    "file_url" TEXT,
    "file_size" INTEGER,
    "file_type" TEXT,
    "notes" TEXT,
    "uploaded_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_requirements" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID,
    "raw_material_id" UUID,
    "packaging_material_id" UUID,
    "quantity_per_unit" DECIMAL(10,4),
    "unit" TEXT,
    "cost_per_unit" DECIMAL(10,2),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_requirements_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "raw_materials" ADD COLUMN "cost_per_unit" DECIMAL(10,2),
ADD COLUMN "current_stock" DECIMAL(10,4);

-- AlterTable
ALTER TABLE "packaging_materials" ADD COLUMN "cost_per_unit" DECIMAL(10,2),
ADD COLUMN "current_stock" DECIMAL(10,4);

-- CreateIndex
CREATE INDEX "client_documents_client_id_idx" ON "client_documents"("client_id");

-- CreateIndex
CREATE INDEX "product_requirements_product_id_idx" ON "product_requirements"("product_id");

-- CreateIndex
CREATE INDEX "product_requirements_raw_material_id_idx" ON "product_requirements"("raw_material_id");

-- CreateIndex
CREATE INDEX "product_requirements_packaging_material_id_idx" ON "product_requirements"("packaging_material_id");

-- AddForeignKey
ALTER TABLE "client_documents" ADD CONSTRAINT "client_documents_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_requirements" ADD CONSTRAINT "product_requirements_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_requirements" ADD CONSTRAINT "product_requirements_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_requirements" ADD CONSTRAINT "product_requirements_packaging_material_id_fkey" FOREIGN KEY ("packaging_material_id") REFERENCES "packaging_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
