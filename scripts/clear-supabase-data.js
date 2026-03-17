#!/usr/bin/env node
/**
 * Script to clear all data from Supabase while keeping table structure intact
 * Usage: node scripts/clear-supabase-data.js
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllData() {
  try {
    console.log('🧹 Starting to clear all data from Supabase...\n');

    // List of tables to clear (in order to respect foreign key constraints)
    const tables = [
      // Clear dependent tables first
      'product_requirements',
      'client_documents',
      'bill_of_material_raw_items',
      'bill_of_material_packaging_items',
      'bill_of_material',
      'customer_orders',
      'product_variants',
      'products',
      'product_categories',
      'raw_materials',
      'packaging_materials',
      'vendors',
      'clients',
      'production_batches',
      'production_batch_items',
      'orders',
      'order_items',
      'users',
      'admin',
      'roles',
      'user_roles',
    ];

    // Clear each table
    for (const table of tables) {
      try {
        const result = await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
        console.log(`✅ Cleared table: ${table}`);
      } catch (error) {
        if (error.code === 'P1002') {
          // Table doesn't exist, skip it
          console.log(`⏭️  Table not found: ${table} (skipping)`);
        } else {
          console.log(`⚠️  Could not clear ${table}: ${error.message}`);
        }
      }
    }

    console.log('\n✨ All data cleared successfully!');
    console.log('📊 Database structure preserved, ready for fresh data.\n');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clearAllData();
