-- Align client_documents with Prisma ClientDocument (binary storage + mime).
-- If `prisma migrate deploy` fails on the pooler, run this SQL in Supabase Dashboard → SQL Editor.
ALTER TABLE "client_documents" ADD COLUMN IF NOT EXISTS "file_data" BYTEA;
ALTER TABLE "client_documents" ADD COLUMN IF NOT EXISTS "mime_type" TEXT;
