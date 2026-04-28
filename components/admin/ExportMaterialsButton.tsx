'use client';

import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

type MaterialRow = {
  id: string;
  category: 'Raw Material' | 'Packaging';
  code: string | null;
  name: string | null;
  unit: string | null;
  batchCount?: number;
  totalQty?: number;
  minStock?: string | null;
  costPerUnit: number | null;
};

interface ExportMaterialsButtonProps {
  data: MaterialRow[];
}

export function ExportMaterialsButton({ data }: ExportMaterialsButtonProps) {
  const handleExport = () => {
    // Prepare the data for Excel
    const excelData = data.map((item) => ({
      Category: item.category,
      Code: item.code || '-',
      Name: item.name || '-',
      Unit: item.unit || '-',
      'Total Qty': item.totalQty || 0,
      'Batch Count': item.batchCount || 0,
      'Cost Per Unit': item.costPerUnit || 0,
      'Min Stock': item.minStock || '-',
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Materials');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Materials_Inventory_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 rounded-lg border border-green-600 text-green-700 px-4 py-2 text-sm font-medium hover:bg-green-50 transition-colors"
    >
      <Download className="w-4 h-4" />
      Export to Excel
    </button>
  );
}
