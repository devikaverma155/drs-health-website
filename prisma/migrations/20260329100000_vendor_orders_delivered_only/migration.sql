-- Single "received" status for vendor orders: normalize legacy `complete` → `delivered`
UPDATE "raw_material_orders" SET "status" = 'delivered' WHERE "status" = 'complete';
UPDATE "packaging_orders" SET "status" = 'delivered' WHERE "status" = 'complete';
