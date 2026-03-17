-- AlterTable: raw_material_orders - add vendor_id and raw_material_id (schema uses these; table had buyer_id from legacy migration)
ALTER TABLE "raw_material_orders" ADD COLUMN IF NOT EXISTS "vendor_id" UUID;
ALTER TABLE "raw_material_orders" ADD COLUMN IF NOT EXISTS "raw_material_id" UUID;

-- CreateTable: packaging_orders (was missing from migrations)
CREATE TABLE IF NOT EXISTS "packaging_orders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "vendor_id" UUID,
    "packaging_id" UUID,
    "order_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "material_type" TEXT,
    "quantity" TEXT,
    "unit" TEXT,
    "price" DECIMAL(10,2),
    "delivery_date" DATE,
    "status" TEXT DEFAULT 'pending',
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packaging_orders_pkey" PRIMARY KEY ("id")
);

-- Indexes for raw_material_orders
CREATE INDEX IF NOT EXISTS "idx_raw_material_orders_vendor_id" ON "raw_material_orders"("vendor_id");
CREATE INDEX IF NOT EXISTS "idx_raw_material_orders_raw_material_id" ON "raw_material_orders"("raw_material_id");

-- Indexes for packaging_orders
CREATE INDEX IF NOT EXISTS "packaging_orders_vendor_id_idx" ON "packaging_orders"("vendor_id");
CREATE INDEX IF NOT EXISTS "packaging_orders_packaging_id_idx" ON "packaging_orders"("packaging_id");
CREATE INDEX IF NOT EXISTS "packaging_orders_status_idx" ON "packaging_orders"("status");

-- ForeignKeys for raw_material_orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'raw_material_orders_vendor_id_fkey'
  ) THEN
    ALTER TABLE "raw_material_orders" ADD CONSTRAINT "raw_material_orders_vendor_id_fkey"
      FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'raw_material_orders_raw_material_id_fkey'
  ) THEN
    ALTER TABLE "raw_material_orders" ADD CONSTRAINT "raw_material_orders_raw_material_id_fkey"
      FOREIGN KEY ("raw_material_id") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- ForeignKeys for packaging_orders
ALTER TABLE "packaging_orders" ADD CONSTRAINT "packaging_orders_vendor_id_fkey"
  FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "packaging_orders" ADD CONSTRAINT "packaging_orders_packaging_id_fkey"
  FOREIGN KEY ("packaging_id") REFERENCES "packaging_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
