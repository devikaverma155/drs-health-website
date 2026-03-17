-- CreateTable
CREATE TABLE "vendors" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "contact_person" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "company_name" TEXT NOT NULL,
    "contact_person" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "gst_number" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_materials" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "material_code" TEXT,
    "name" TEXT,
    "unit" TEXT,
    "purchase_rate" DECIMAL(10,2),
    "supplier_id" UUID,
    "min_stock" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raw_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_material_batches" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "material_id" UUID,
    "batch_number" TEXT,
    "manufacturing_date" DATE,
    "expiry_date" DATE,
    "quantity" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raw_material_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packaging_materials" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "packaging_code" TEXT,
    "name" TEXT,
    "supplier_id" UUID,
    "quantity" DECIMAL,
    "unit" TEXT,
    "min_stock" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packaging_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packaging_batches" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "packaging_id" UUID,
    "batch_number" TEXT,
    "quantity" DECIMAL,
    "purchase_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packaging_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "category_id" UUID,
    "pack_size" TEXT,
    "mrp" DECIMAL(10,2),
    "standard_batch_size" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "raw_materials_material_code_key" ON "raw_materials"("material_code");

-- CreateIndex
CREATE INDEX "raw_material_batches_material_id_idx" ON "raw_material_batches"("material_id");

-- CreateIndex
CREATE INDEX "packaging_batches_packaging_id_idx" ON "packaging_batches"("packaging_id");

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- AddForeignKey
ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raw_material_batches" ADD CONSTRAINT "raw_material_batches_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packaging_materials" ADD CONSTRAINT "packaging_materials_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packaging_batches" ADD CONSTRAINT "packaging_batches_packaging_id_fkey" FOREIGN KEY ("packaging_id") REFERENCES "packaging_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
