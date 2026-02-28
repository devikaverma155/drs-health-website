-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "role" TEXT DEFAULT 'employee',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "designation" TEXT,
    "department" TEXT,
    "joining_date" DATE,
    "salary" DECIMAL,
    "status" TEXT DEFAULT 'active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_documents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "employee_id" UUID,
    "document_type" TEXT,
    "file_url" TEXT,
    "uploaded_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_material_buyers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "company_name" TEXT,
    "contact_person" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "material_required" TEXT,
    "quantity" TEXT,
    "location" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raw_material_buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_material_orders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "buyer_id" UUID,
    "order_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "material_type" TEXT,
    "quantity" TEXT,
    "unit" TEXT,
    "price" DECIMAL(10,2),
    "supplier_name" TEXT,
    "supplier_contact" TEXT,
    "delivery_date" DATE,
    "status" TEXT DEFAULT 'pending',
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raw_material_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "source" TEXT,
    "status" TEXT DEFAULT 'new',
    "company_name" TEXT,
    "message" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "assigned_to" UUID,
    "priority" TEXT DEFAULT 'medium',
    "tags" TEXT[],
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_details" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "lead_id" UUID,
    "field_key" TEXT,
    "field_value" TEXT,

    CONSTRAINT "lead_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_activity" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "lead_id" UUID,
    "action" TEXT,
    "note" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinic_patients" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "condition" TEXT,
    "assigned_doctor" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinic_patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsapp_messages" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "lead_id" UUID,
    "phone" TEXT,
    "direction" TEXT,
    "message" TEXT,
    "status" TEXT,
    "sent_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whatsapp_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_content" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "section_key" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "image_url" TEXT,
    "cta_text" TEXT,
    "cta_link" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "website_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_events" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "product_ids" JSONB,
    "cart_value" DECIMAL,
    "status" TEXT DEFAULT 'active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_slides" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "headline" TEXT NOT NULL,
    "subtext" TEXT,
    "cta_label" TEXT,
    "cta_href" TEXT,
    "secondary_cta_label" TEXT,
    "secondary_cta_href" TEXT,
    "image_url" TEXT,
    "image_alt" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combo_offers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "price" TEXT,
    "original_price" TEXT,
    "discount" TEXT,
    "cta_label" TEXT,
    "cta_href" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "combo_offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_raw_material_orders_buyer_id" ON "raw_material_orders"("buyer_id");

-- CreateIndex
CREATE INDEX "idx_raw_material_orders_order_date" ON "raw_material_orders"("order_date");

-- CreateIndex
CREATE INDEX "idx_raw_material_orders_status" ON "raw_material_orders"("status");

-- AddForeignKey
ALTER TABLE "lead_activity" ADD CONSTRAINT "lead_activity_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
