-- BOM & Production & Orders & Roles & Blog etc.
CREATE TABLE "bill_of_materials" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID,
    "quantity" INTEGER DEFAULT 1,
    "status" TEXT DEFAULT 'draft',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bill_of_materials_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bom_raw_items" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "bom_id" UUID,
    "raw_material_id" UUID,
    "quantity" DECIMAL,

    CONSTRAINT "bom_raw_items_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bom_packaging_items" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "bom_id" UUID,
    "packaging_id" UUID,
    "quantity" DECIMAL,

    CONSTRAINT "bom_packaging_items_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "production_batches" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID,
    "batch_number" TEXT,
    "manufacturing_date" DATE,
    "expiry_date" DATE,
    "quantity_produced" DECIMAL,
    "status" TEXT DEFAULT 'running',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "production_batches_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "finished_goods_batches" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID,
    "batch_number" TEXT,
    "manufacturing_date" DATE,
    "expiry_date" DATE,
    "quantity_available" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "finished_goods_batches_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "client_id" UUID,
    "order_date" DATE,
    "status" TEXT DEFAULT 'pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "order_items" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_id" UUID,
    "product_id" UUID,
    "quantity" DECIMAL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "dispatches" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_id" UUID,
    "dispatch_date" DATE,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispatches_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "lead_followups" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "lead_id" UUID,
    "followup_date" TIMESTAMP(6),
    "reminder" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_followups_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "lead_pipeline_history" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "lead_id" UUID,
    "old_stage" TEXT,
    "new_stage" TEXT,
    "changed_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_pipeline_history_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "role_name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_roles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "role_id" UUID,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "stock_movements" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "item_type" TEXT,
    "item_id" UUID,
    "movement_type" TEXT,
    "quantity" DECIMAL,
    "reference_type" TEXT,
    "reference_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "customer_orders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "woo_order_id" TEXT,
    "razorpay_order_id" TEXT,
    "razorpay_payment_id" TEXT,
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "first_name" TEXT,
    "last_name" TEXT,
    "total" DECIMAL(10,2),
    "status" TEXT DEFAULT 'pending',
    "items" JSONB,
    "shipping_address" JSONB,
    "billing_address" JSONB,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_orders_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "blog_posts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "image" TEXT,
    "category" TEXT,
    "read_time" TEXT,
    "published_at" DATE,
    "is_published" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");
CREATE UNIQUE INDEX "customer_orders_woo_order_id_key" ON "customer_orders"("woo_order_id");
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

CREATE INDEX "bill_of_materials_product_id_idx" ON "bill_of_materials"("product_id");
CREATE INDEX "bom_raw_items_bom_id_idx" ON "bom_raw_items"("bom_id");
CREATE INDEX "bom_raw_items_raw_material_id_idx" ON "bom_raw_items"("raw_material_id");
CREATE INDEX "bom_packaging_items_bom_id_idx" ON "bom_packaging_items"("bom_id");
CREATE INDEX "bom_packaging_items_packaging_id_idx" ON "bom_packaging_items"("packaging_id");
CREATE INDEX "production_batches_product_id_idx" ON "production_batches"("product_id");
CREATE INDEX "finished_goods_batches_product_id_idx" ON "finished_goods_batches"("product_id");
CREATE INDEX "orders_client_id_idx" ON "orders"("client_id");
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");
CREATE INDEX "order_items_product_id_idx" ON "order_items"("product_id");
CREATE INDEX "dispatches_order_id_idx" ON "dispatches"("order_id");
CREATE INDEX "customer_orders_email_idx" ON "customer_orders"("email");
CREATE INDEX "customer_orders_status_idx" ON "customer_orders"("status");
CREATE INDEX "customer_orders_created_at_idx" ON "customer_orders"("created_at");
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");
CREATE INDEX "blog_posts_is_published_idx" ON "blog_posts"("is_published");

ALTER TABLE "bill_of_materials" ADD CONSTRAINT "bill_of_materials_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "bom_raw_items" ADD CONSTRAINT "bom_raw_items_bom_id_fkey" FOREIGN KEY ("bom_id") REFERENCES "bill_of_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "bom_raw_items" ADD CONSTRAINT "bom_raw_items_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "raw_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "bom_packaging_items" ADD CONSTRAINT "bom_packaging_items_bom_id_fkey" FOREIGN KEY ("bom_id") REFERENCES "bill_of_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "bom_packaging_items" ADD CONSTRAINT "bom_packaging_items_packaging_id_fkey" FOREIGN KEY ("packaging_id") REFERENCES "packaging_materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "production_batches" ADD CONSTRAINT "production_batches_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "finished_goods_batches" ADD CONSTRAINT "finished_goods_batches_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "dispatches" ADD CONSTRAINT "dispatches_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
