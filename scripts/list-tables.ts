import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listTables() {
  try {
    console.log('🔍 Checking existing tables in database...\n');
    
    // Query PostgreSQL information_schema to get all tables
    const result = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    
    if (result.length === 0) {
      console.log('📭 No tables found in the database.');
      console.log('   Run: npm run db:push to create tables\n');
    } else {
      console.log(`✅ Found ${result.length} table(s):\n`);
      result.forEach((row, index) => {
        console.log(`   ${index + 1}. ${row.table_name}`);
      });
      console.log('');
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('does not exist')) {
      console.error('\n💡 Database connection issue. Check your DATABASE_URL.\n');
    }
  } finally {
    await prisma.$disconnect();
  }
}

listTables();
