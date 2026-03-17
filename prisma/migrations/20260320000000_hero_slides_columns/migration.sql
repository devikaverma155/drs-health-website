-- AlterTable: hero_slides - add columns required by current schema
ALTER TABLE "hero_slides" ADD COLUMN IF NOT EXISTS "text_color" TEXT DEFAULT '#FFFFFF';
ALTER TABLE "hero_slides" ADD COLUMN IF NOT EXISTS "headline_bold" BOOLEAN DEFAULT true;
ALTER TABLE "hero_slides" ADD COLUMN IF NOT EXISTS "subtext_bold" BOOLEAN DEFAULT false;
