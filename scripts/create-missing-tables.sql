-- Create Admin table for authentication
CREATE TABLE IF NOT EXISTS admin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create raw_material_orders table for order tracking
CREATE TABLE IF NOT EXISTS raw_material_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES raw_material_buyers(id) ON DELETE CASCADE,
  order_date TIMESTAMP DEFAULT NOW(),
  material_type TEXT,
  quantity TEXT,
  unit TEXT,
  price DECIMAL(10, 2),
  supplier_name TEXT,
  supplier_contact TEXT,
  delivery_date DATE,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for raw_material_orders
CREATE INDEX IF NOT EXISTS idx_raw_material_orders_buyer_id ON raw_material_orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_raw_material_orders_order_date ON raw_material_orders(order_date);
CREATE INDEX IF NOT EXISTS idx_raw_material_orders_status ON raw_material_orders(status);
