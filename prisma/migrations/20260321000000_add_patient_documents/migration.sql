-- CreateTable
CREATE TABLE "patient_documents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "patient_id" UUID,
    "file_name" TEXT,
    "file_url" TEXT,
    "file_size" INTEGER,
    "uploaded_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_documents_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "patient_documents_patient_id_idx" ON "patient_documents"("patient_id");

ALTER TABLE "patient_documents" ADD CONSTRAINT "patient_documents_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "clinic_patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
