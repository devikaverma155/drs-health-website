import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding admin...');
  const password = await hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@drshealth.com' },
    create: {
      email: 'admin@drshealth.com',
      password,
      name: 'Admin',
    },
    update: {},
  });
  console.log('Seeded admin: admin@drshealth.com / admin123');

  // ---------------------------------------------------------------------------
  // VENDORS
  // ---------------------------------------------------------------------------
  console.log('Seeding vendors...');
  const v1 = await prisma.vendor.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'ABC Raw Materials Ltd',
      contactPerson: 'Raj Kumar',
      phone: '+91 9876543210',
      email: 'raj@abcraw.com',
      address: 'Industrial Area, Mumbai',
    },
    update: {},
  });
  const v2 = await prisma.vendor.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Pack Solutions India',
      contactPerson: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya@packsolutions.in',
    },
    update: {},
  });
  const vendorIds = [v1.id, v2.id];

  // ---------------------------------------------------------------------------
  // RAW MATERIALS + BATCHES
  // ---------------------------------------------------------------------------
  console.log('Seeding raw materials and batches...');
  const rm1 = await prisma.rawMaterial.upsert({
    where: { materialCode: 'RM-SAMPLE-01' },
    create: {
      materialCode: 'RM-SAMPLE-01',
      name: 'sample 1',
      unit: '23kg',
      costPerUnit: 500,
      minStock: 10,
      currentStock: 50,
      supplierId: v1.id,
    },
    update: {},
  });
  const rm2 = await prisma.rawMaterial.upsert({
    where: { materialCode: 'RM-HERB-01' },
    create: {
      materialCode: 'RM-HERB-01',
      name: 'Giloy Extract',
      unit: 'kg',
      costPerUnit: 1200,
      minStock: 5,
      currentStock: 25,
      supplierId: v1.id,
    },
    update: {},
  });
  const rm3 = await prisma.rawMaterial.upsert({
    where: { materialCode: 'RM-SYRUP-01' },
    create: {
      materialCode: 'RM-SYRUP-01',
      name: 'Sugar Syrup Base',
      unit: 'L',
      costPerUnit: 80,
      minStock: 100,
      currentStock: 500,
      supplierId: v1.id,
    },
    update: {},
  });

  await prisma.rawMaterialBatch.createMany({
    data: [
      { materialId: rm1.id, batchNumber: 'RM-B1-001', quantity: 30, manufacturingDate: new Date('2025-01-01'), expiryDate: new Date('2026-01-01') },
      { materialId: rm1.id, batchNumber: 'RM-B1-002', quantity: 20, manufacturingDate: new Date('2025-02-01'), expiryDate: new Date('2026-02-01') },
      { materialId: rm2.id, batchNumber: 'RM-B2-001', quantity: 25, manufacturingDate: new Date('2025-01-15'), expiryDate: new Date('2026-06-15') },
      { materialId: rm3.id, batchNumber: 'RM-B3-001', quantity: 500, manufacturingDate: new Date('2025-02-01'), expiryDate: new Date('2026-02-01') },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // PACKAGING MATERIALS + BATCHES
  // ---------------------------------------------------------------------------
  console.log('Seeding packaging materials and batches...');
  const pm1 = await prisma.packagingMaterial.upsert({
    where: { id: '00000000-0000-0000-0000-000000000031' },
    create: {
      id: '00000000-0000-0000-0000-000000000031',
      packagingCode: 'PM-CAP-01',
      name: 'caps',
      unit: '1',
      costPerUnit: 0.5,
      currentStock: 1000,
      minStock: 200,
      supplierId: v2.id,
    },
    update: {},
  });
  const pm2 = await prisma.packagingMaterial.upsert({
    where: { id: '00000000-0000-0000-0000-000000000032' },
    create: {
      id: '00000000-0000-0000-0000-000000000032',
      packagingCode: 'PM-BTL-01',
      name: '200ml Amber Bottle',
      unit: 'pcs',
      costPerUnit: 8,
      currentStock: 500,
      minStock: 100,
      supplierId: v2.id,
    },
    update: {},
  });

  await prisma.packagingBatch.createMany({
    data: [
      { packagingId: pm1.id, batchNumber: 'PM-CAP-001', quantity: 1000, purchaseDate: new Date('2025-02-01') },
      { packagingId: pm2.id, batchNumber: 'PM-BTL-001', quantity: 500, purchaseDate: new Date('2025-02-10') },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // VENDOR ORDERS (RM & PM)
  // ---------------------------------------------------------------------------
  console.log('Seeding vendor orders...');
  await prisma.rawMaterialOrder.createMany({
    data: [
      { vendorId: v1.id, rawMaterialId: rm1.id, quantity: '50', unit: '23kg', price: 25000, status: 'delivered', orderDate: new Date('2025-01-15') },
      { vendorId: v1.id, rawMaterialId: rm2.id, quantity: '30', unit: 'kg', price: 36000, status: 'pending', orderDate: new Date('2025-03-01') },
    ],
    skipDuplicates: true,
  });
  await prisma.packagingOrder.createMany({
    data: [
      { vendorId: v2.id, packagingId: pm1.id, quantity: '500', unit: 'pcs', price: 250, status: 'delivered', orderDate: new Date('2025-02-01') },
      { vendorId: v2.id, packagingId: pm2.id, quantity: '200', unit: 'pcs', price: 1600, status: 'pending', orderDate: new Date('2025-03-05') },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // PRODUCT CATEGORIES
  // ---------------------------------------------------------------------------
  console.log('Seeding product categories...');
  const cat1 = await prisma.productCategory.upsert({
    where: { id: '00000000-0000-0000-0000-000000000011' },
    create: {
      id: '00000000-0000-0000-0000-000000000011',
      name: 'Syrups',
      description: 'Liquid formulations',
    },
    update: {},
  });
  const cat2 = await prisma.productCategory.upsert({
    where: { id: '00000000-0000-0000-0000-000000000012' },
    create: {
      id: '00000000-0000-0000-0000-000000000012',
      name: 'Tablets',
      description: 'Solid oral dosage',
    },
    update: {},
  });
  const cat3 = await prisma.productCategory.upsert({
    where: { id: '00000000-0000-0000-0000-000000000013' },
    create: {
      id: '00000000-0000-0000-0000-000000000013',
      name: 'Hair Care',
      description: 'Hair wellness range',
    },
    update: {},
  });

  // ---------------------------------------------------------------------------
  // PRODUCTS
  // ---------------------------------------------------------------------------
  console.log('Seeding products...');
  const prod1 = await prisma.product.upsert({
    where: { id: '00000000-0000-0000-0000-000000000021' },
    create: {
      id: '00000000-0000-0000-0000-000000000021',
      name: 'syrup',
      categoryId: cat1.id,
      packSize: '200ml',
      mrp: 299,
      standardBatchSize: 100,
    },
    update: {},
  });
  const prod2 = await prisma.product.upsert({
    where: { id: '00000000-0000-0000-0000-000000000022' },
    create: {
      id: '00000000-0000-0000-0000-000000000022',
      name: 'Immunity Syrup',
      categoryId: cat1.id,
      packSize: '200ml',
      mrp: 349,
      standardBatchSize: 50,
    },
    update: {},
  });
  const prod3 = await prisma.product.upsert({
    where: { id: '00000000-0000-0000-0000-000000000023' },
    create: {
      id: '00000000-0000-0000-0000-000000000023',
      name: 'Liver Care Tablets',
      categoryId: cat2.id,
      packSize: '60 tabs',
      mrp: 449,
      standardBatchSize: 200,
    },
    update: {},
  });

  // ---------------------------------------------------------------------------
  // PRODUCT REQUIREMENTS (per unit: RM & PM for each product)
  // ---------------------------------------------------------------------------
  console.log('Seeding product requirements...');
  await prisma.productRequirement.createMany({
    data: [
      { productId: prod1.id, rawMaterialId: rm1.id, quantityPerUnit: 1, unit: '23kg' },
      { productId: prod1.id, packagingMaterialId: pm1.id, quantityPerUnit: 1, unit: '1' },
      { productId: prod1.id, rawMaterialId: rm3.id, quantityPerUnit: 0.2, unit: 'L' },
      { productId: prod1.id, packagingMaterialId: pm2.id, quantityPerUnit: 1, unit: 'pcs' },
      { productId: prod2.id, rawMaterialId: rm2.id, quantityPerUnit: 0.05, unit: 'kg' },
      { productId: prod2.id, rawMaterialId: rm3.id, quantityPerUnit: 0.15, unit: 'L' },
      { productId: prod2.id, packagingMaterialId: pm2.id, quantityPerUnit: 1, unit: 'pcs' },
      { productId: prod2.id, packagingMaterialId: pm1.id, quantityPerUnit: 1, unit: '1' },
      { productId: prod3.id, rawMaterialId: rm2.id, quantityPerUnit: 0.02, unit: 'kg' },
      { productId: prod3.id, packagingMaterialId: pm1.id, quantityPerUnit: 1, unit: '1' },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // CLIENTS
  // ---------------------------------------------------------------------------
  console.log('Seeding clients...');
  const client1 = await prisma.client.create({
    data: {
      companyName: 'HealthMart Distributors',
      contactPerson: 'Amit Verma',
      phone: '+91 9812345678',
      email: 'amit@healthmart.in',
      address: 'Sector 18, Noida',
      city: 'Noida',
      state: 'UP',
      gstNumber: '09AABCU9603R1ZM',
      notes: 'Preferred B2B client. Payment terms 30 days.',
    },
  });
  const client2 = await prisma.client.create({
    data: {
      companyName: 'Ayur Wellness Store',
      contactPerson: 'Sneha Reddy',
      phone: '+91 9123456789',
      email: 'sneha@ayurwellness.com',
      city: 'Hyderabad',
      state: 'Telangana',
      gstNumber: '36AABCA1234A1Z5',
    },
  });

  // ---------------------------------------------------------------------------
  // LEADS (mixed statuses and sources)
  // ---------------------------------------------------------------------------
  console.log('Seeding leads...');
  const leadStatuses = ['new', 'contacted', 'interested', 'quotation_sent', 'converted', 'closed'] as const;
  const leadSources = ['website', 'referral', 'contact_form', 'consultation', 'whatsapp', 'meta_ads'] as const;
  await prisma.lead.createMany({
    data: [
      { name: 'Ravi Mehta', email: 'ravi@example.com', phone: '9876500001', source: 'website', status: 'new', city: 'Mumbai', state: 'Maharashtra' },
      { name: 'Kavita Singh', email: 'kavita@example.com', phone: '9876500002', source: 'consultation', status: 'contacted', companyName: 'Kavita Pharma' },
      { name: 'Anil Kumar', email: 'anil@example.com', phone: '9876500003', source: 'referral', status: 'interested', city: 'Delhi' },
      { name: 'Pooja Nair', email: 'pooja@example.com', phone: '9876500004', source: 'contact_form', status: 'quotation_sent', message: 'Need bulk quote for syrups' },
      { name: 'Vikram Joshi', email: 'vikram@example.com', phone: '9876500005', source: 'whatsapp', status: 'converted', companyName: 'Joshi Distributors' },
      { name: 'Deepa Krishnan', email: 'deepa@example.com', phone: '9876500006', source: 'meta_ads', status: 'closed', city: 'Chennai' },
      { name: 'Sanjay Gupta', email: 'sanjay@example.com', phone: '9876500007', source: 'website', status: 'new' },
      { name: 'Meera Iyer', email: 'meera@example.com', phone: '9876500008', source: 'referral', status: 'contacted', city: 'Bangalore' },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // EMPLOYEES
  // ---------------------------------------------------------------------------
  console.log('Seeding employees...');
  const emp1 = await prisma.employee.create({
    data: {
      name: 'Rahul Sharma',
      email: 'rahul@drshealth.in',
      phone: '+91 9876510001',
      designation: 'Production Manager',
      department: 'Production',
      joiningDate: new Date('2024-01-15'),
      salary: 55000,
      status: 'active',
    },
  });
  await prisma.employee.create({
    data: {
      name: 'Neha Patel',
      email: 'neha@drshealth.in',
      phone: '+91 9876510002',
      designation: 'Sales Executive',
      department: 'Sales',
      joiningDate: new Date('2024-06-01'),
      salary: 42000,
      status: 'active',
    },
  });

  // ---------------------------------------------------------------------------
  // CLINIC PATIENTS
  // ---------------------------------------------------------------------------
  console.log('Seeding clinic patients...');
  await prisma.clinicPatient.createMany({
    data: [
      { name: 'Patient One', phone: '9876520001', email: 'p1@example.com', age: 45, gender: 'Male', condition: 'Diabetes', assignedDoctor: 'Dr. Surya', notes: 'Follow-up in 2 weeks' },
      { name: 'Patient Two', phone: '9876520002', email: 'p2@example.com', age: 32, gender: 'Female', condition: 'PCOS', assignedDoctor: 'Dr. Meera' },
      { name: 'Patient Three', phone: '9876520003', age: 58, condition: 'Hypertension', notes: 'Stable on current regimen' },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // BILL OF MATERIALS
  // ---------------------------------------------------------------------------
  console.log('Seeding BOMs...');
  const bom1 = await prisma.billOfMaterial.create({
    data: {
      productId: prod1.id,
      quantity: 100,
      status: 'complete',
    },
  });
  await prisma.billOfMaterial.create({
    data: {
      productId: prod2.id,
      quantity: 50,
      status: 'draft',
    },
  });
  await prisma.billOfMaterial.create({
    data: {
      productId: prod3.id,
      quantity: 200,
      status: 'complete',
    },
  });

  // ---------------------------------------------------------------------------
  // PRODUCTION BATCHES (running + completed)
  // ---------------------------------------------------------------------------
  console.log('Seeding production batches...');
  const prodBatch1 = await prisma.productionBatch.create({
    data: {
      productId: prod1.id,
      batchNumber: 'PROD-SYP-001',
      manufacturingDate: new Date('2025-02-20'),
      expiryDate: new Date('2026-02-20'),
      quantityProduced: 100,
      status: 'completed',
    },
  });
  await prisma.productionBatch.create({
    data: {
      productId: prod2.id,
      batchNumber: 'PROD-IMM-001',
      manufacturingDate: new Date('2025-03-01'),
      expiryDate: new Date('2026-03-01'),
      quantityProduced: 50,
      status: 'running',
    },
  });
  await prisma.productionBatch.create({
    data: {
      productId: prod3.id,
      batchNumber: 'PROD-LIV-001',
      manufacturingDate: new Date('2025-02-25'),
      expiryDate: new Date('2026-02-25'),
      quantityProduced: 200,
      status: 'completed',
    },
  });

  // ---------------------------------------------------------------------------
  // FINISHED GOODS BATCHES (so we have stock to dispatch)
  // ---------------------------------------------------------------------------
  console.log('Seeding finished goods batches...');
  await prisma.finishedGoodsBatch.createMany({
    data: [
      { productId: prod1.id, batchNumber: 'PROD-SYP-001', manufacturingDate: new Date('2025-02-20'), expiryDate: new Date('2026-02-20'), quantityAvailable: 100 },
      { productId: prod1.id, batchNumber: 'PROD-SYP-002', manufacturingDate: new Date('2025-03-01'), expiryDate: new Date('2026-03-01'), quantityAvailable: 80 },
      { productId: prod2.id, batchNumber: 'PROD-IMM-001', manufacturingDate: new Date('2025-02-15'), expiryDate: new Date('2026-02-15'), quantityAvailable: 50 },
      { productId: prod3.id, batchNumber: 'PROD-LIV-001', manufacturingDate: new Date('2025-02-25'), expiryDate: new Date('2026-02-25'), quantityAvailable: 200 },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // ORDERS & DISPATCH
  // ---------------------------------------------------------------------------
  console.log('Seeding orders and dispatches...');
  const order1 = await prisma.order.create({
    data: {
      clientId: client1.id,
      orderDate: new Date('2025-03-10'),
      status: 'dispatched',
      orderItems: {
        create: [
          { productId: prod1.id, quantity: 30 },
          { productId: prod3.id, quantity: 50 },
        ],
      },
    },
  });
  await prisma.dispatch.create({
    data: {
      orderId: order1.id,
      dispatchDate: new Date('2025-03-12'),
      notes: 'Courier: DTDC. AWB 12345678',
    },
  });

  const order2 = await prisma.order.create({
    data: {
      clientId: client2.id,
      orderDate: new Date('2025-03-14'),
      status: 'pending',
      orderItems: {
        create: [
          { productId: prod2.id, quantity: 20 },
          { productId: prod1.id, quantity: 10 },
        ],
      },
    },
  });

  // ---------------------------------------------------------------------------
  // CONTENT: HERO SLIDES
  // ---------------------------------------------------------------------------
  console.log('Seeding hero slides...');
  await prisma.heroSlide.createMany({
    data: [
      { headline: 'Authentic Ayurvedic Wellness', subtext: 'Trusted by 10 Lakh+ customers', ctaLabel: 'Shop Now', ctaHref: '/shop', sortOrder: 0, isActive: true },
      { headline: 'Free Expert Consultation', subtext: 'Get personalised health guidance', ctaLabel: 'Book Now', ctaHref: '/consultation', sortOrder: 1, isActive: true },
      { headline: 'Liver Care & Immunity', subtext: 'Natural formulations for holistic health', ctaLabel: 'Explore', ctaHref: '/shop', sortOrder: 2, isActive: true },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // CONTENT: COMBO OFFERS
  // ---------------------------------------------------------------------------
  console.log('Seeding combo offers...');
  await prisma.comboOffer.createMany({
    data: [
      { title: 'Liver + Immunity Combo', description: 'Best-selling liver and immunity support', price: '599', originalPrice: '698', discount: '14%', ctaLabel: 'Buy Now', ctaHref: '/shop', sortOrder: 0, isActive: true },
      { title: 'Weight Management Pack', description: 'Complete 30-day programme', price: '899', originalPrice: '999', discount: '10%', ctaLabel: 'View', ctaHref: '/shop', sortOrder: 1, isActive: true },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // CONTENT: BLOG POSTS
  // ---------------------------------------------------------------------------
  console.log('Seeding blog posts...');
  await prisma.blogPost.createMany({
    data: [
      { slug: 'benefits-of-giloy', title: 'Benefits of Giloy for Immunity', excerpt: 'Learn how Giloy supports natural immunity.', content: '<p>Giloy has been used in Ayurveda for centuries...</p>', category: 'Herbal Remedies', readTime: '5 min', publishedAt: new Date('2025-02-01'), isPublished: true },
      { slug: 'liver-care-ayurveda', title: 'Liver Care with Ayurveda', excerpt: 'Natural ways to support liver health.', content: '<p>Your liver plays a vital role in detoxification...</p>', category: 'Wellness', readTime: '6 min', publishedAt: new Date('2025-02-15'), isPublished: true },
      { slug: 'winter-immunity-tips', title: 'Winter Immunity Tips', excerpt: 'Stay healthy through the cold season.', content: '<p>Simple dietary and lifestyle tips...</p>', category: 'Seasonal', readTime: '4 min', publishedAt: new Date('2025-01-20'), isPublished: true },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // ROLES
  // ---------------------------------------------------------------------------
  console.log('Seeding roles...');
  await prisma.role.createMany({
    data: [
      { roleName: 'Admin' },
      { roleName: 'Production Manager' },
      { roleName: 'Sales' },
      { roleName: 'Inventory Manager' },
    ],
    skipDuplicates: true,
  });

  // ---------------------------------------------------------------------------
  // WEBSITE CONTENT (optional blocks)
  // ---------------------------------------------------------------------------
  console.log('Seeding website content...');
  await prisma.websiteContent.createMany({
    data: [
      { sectionKey: 'hero_subtitle', title: 'Welcome', subtitle: 'Your wellness journey starts here', isActive: true },
      { sectionKey: 'features', title: 'Why Choose Us', subtitle: 'Authentic • Expert • Trusted', isActive: true },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed successfully.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
