import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function analyzeSchema() {
  try {
    console.log('🔍 Analyzing database schema...\n');
    
    // Get all tables
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    
    console.log(`📊 Found ${tables.length} tables:\n`);
    
    // Get structure of each table
    for (const table of tables) {
      const tableName = table.table_name;
      console.log(`\n📋 Table: ${tableName}`);
      console.log('─'.repeat(50));
      
      const columns = await prisma.$queryRaw<Array<{
        column_name: string;
        data_type: string;
        is_nullable: string;
        column_default: string | null;
      }>>`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' 
          AND table_name = ${tableName}
        ORDER BY ordinal_position;
      `;
      
      columns.forEach(col => {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`  • ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`);
      });
      
      // Get foreign keys
      const fks = await prisma.$queryRaw<Array<{
        constraint_name: string;
        column_name: string;
        foreign_table_name: string;
        foreign_column_name: string;
      }>>`
        SELECT
          tc.constraint_name,
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_schema = 'public'
          AND tc.table_name = ${tableName};
      `;
      
      if (fks.length > 0) {
        console.log('\n  🔗 Foreign Keys:');
        fks.forEach(fk => {
          console.log(`    • ${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`);
        });
      }
    }
    
    console.log('\n\n✅ Schema analysis complete!\n');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

analyzeSchema();
