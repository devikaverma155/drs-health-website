import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdminSetup() {
  try {
    console.log('🔍 Checking database connection...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully\n');

    // Check if Admin table exists and has data
    console.log('🔍 Checking for admin users...');
    const adminCount = await prisma.admin.count();
    console.log(`📊 Found ${adminCount} admin user(s) in database\n`);

    if (adminCount === 0) {
      console.log('❌ No admin users found!');
      console.log('\n📝 To create the admin user, run:');
      console.log('   npm run db:seed\n');
      process.exit(1);
    }

    // Check if the specific admin exists
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@drshealth.com' },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!admin) {
      console.log('❌ Admin user "admin@drshealth.com" not found!');
      console.log('\n📝 To create the admin user, run:');
      console.log('   npm run db:seed\n');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name || 'N/A'}`);
    console.log(`   Created: ${admin.createdAt}\n`);

    console.log('✅ Admin setup looks good!');
    console.log('\n🔑 Login credentials:');
    console.log('   Email: admin@drshealth.com');
    console.log('   Password: admin123\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('DATABASE_URL')) {
      console.error('\n💡 Missing DATABASE_URL environment variable!');
      console.error('   Please set DATABASE_URL in your .env file');
      console.error('   Example: DATABASE_URL="postgresql://user:password@localhost:5432/dbname"\n');
    } else if (error.message.includes('P1001') || error.message.includes('connect')) {
      console.error('\n💡 Cannot connect to database!');
      console.error('   Please check your DATABASE_URL and ensure the database is running\n');
    } else if (error.message.includes('P1012')) {
      console.error('\n💡 Database schema not initialized!');
      console.error('   Please run: npx prisma db push\n');
    } else {
      console.error('\n💡 Unexpected error. Full details:');
      console.error(error);
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminSetup();
