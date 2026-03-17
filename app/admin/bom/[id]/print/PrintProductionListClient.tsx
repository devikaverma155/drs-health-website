'use client';

import { useRouter } from 'next/navigation';

export function PrintProductionListClient() {
  const router = useRouter();

  function handlePrint() {
    window.print();
  }

  return (
    <div className="print:hidden sticky top-0 z-10 bg-slate-100 border-b border-slate-300 px-6 py-3 flex items-center justify-between gap-4">
      <p className="text-sm text-slate-700">
        Print this page or choose “Save as PDF” in the print dialog to download.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={() => window.close()}
          className="rounded-lg border border-slate-400 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
