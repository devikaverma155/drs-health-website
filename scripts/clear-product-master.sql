-- Wipe products, BOMs, and related rows. Does NOT touch `admin` or auth tables.
-- Run in psql: psql "$DATABASE_URL" -f scripts/clear-product-master.sql
-- Review FKs in prisma/schema.prisma before running on production.

BEGIN;

DELETE FROM bom_packaging_items;
DELETE FROM bom_raw_items;
DELETE FROM bill_of_materials;

DELETE FROM production_batches;
DELETE FROM finished_goods_batches;

DELETE FROM order_items;
DELETE FROM dispatches;
DELETE FROM orders;

DELETE FROM products;
DELETE FROM product_categories;

COMMIT;
