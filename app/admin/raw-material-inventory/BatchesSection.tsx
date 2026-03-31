'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RawMaterialBatch } from '@prisma/client';

interface Props {
    materialId: string;
    materialName: string;
    batches: RawMaterialBatch[];
}

export function BatchesSection({ materialId, materialName, batches: initialBatches }: Props) {
    const router = useRouter();
    const [batches, setBatches] = useState(initialBatches);
    const [showForm, setShowForm] = useState(false);

    const [batchNumber, setBatchNumber] = useState('');
    const [quantity, setQuantity] = useState('');
    const [mfgDate, setMfgDate] = useState('');
    const [expDate, setExpDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSave() {
        if (!batchNumber.trim() || !quantity.trim()) {
            setError('Batch number and quantity are required');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const body = {
                materialId,
                batchNumber: batchNumber.trim(),
                quantity: parseFloat(quantity),
                manufacturingDate: mfgDate ? new Date(mfgDate) : null,
                expiryDate: expDate ? new Date(expDate) : null,
            };

            const res = await fetch('/api/batches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error('Failed to create batch');
            }

            const created = await res.json();
            setBatches([...batches, created]);

            // Reset form
            setBatchNumber('');
            setQuantity('');
            setMfgDate('');
            setExpDate('');
            setShowForm(false);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error saving batch');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(batchId: string) {
        if (!confirm('Delete this batch?')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/batches/${batchId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete batch');
            setBatches(batches.filter(b => b.id !== batchId));
            router.refresh();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Error deleting batch');
        } finally {
            setLoading(false);
        }
    }

    const totalQty = batches.reduce((sum, b) => sum + Number(b.quantity ?? 0), 0);

    return (
        <div className="rounded-xl bg-white border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">In Stock (Batches)</h2>
                    <p className="text-sm text-slate-500 mt-1">Total: <span className="font-semibold text-slate-900">{totalQty.toLocaleString('en-IN', { maximumFractionDigits: 3 })}</span></p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (showForm) {
                            setBatchNumber('');
                            setQuantity('');
                            setMfgDate('');
                            setExpDate('');
                            setError('');
                        }
                    }}
                    disabled={loading}
                    className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
                >
                    {showForm ? 'Cancel' : '+ Add Batch'}
                </button>
            </div>

            {showForm && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Batch Number</label>
                        <input
                            type="text"
                            placeholder="e.g., BATCH-001"
                            value={batchNumber}
                            onChange={(e) => setBatchNumber(e.target.value)}
                            disabled={loading}
                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Quantity</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="e.g., 100"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            disabled={loading}
                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Mfg Date</label>
                            <input
                                type="date"
                                value={mfgDate}
                                onChange={(e) => setMfgDate(e.target.value)}
                                disabled={loading}
                                className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Expiry Date</label>
                            <input
                                type="date"
                                value={expDate}
                                onChange={(e) => setExpDate(e.target.value)}
                                disabled={loading}
                                className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Saving...' : 'Save Batch'}
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                            <th className="px-4 py-3 font-medium">Batch Number</th>
                            <th className="px-4 py-3 font-medium">Quantity</th>
                            <th className="px-4 py-3 font-medium">Mfg Date</th>
                            <th className="px-4 py-3 font-medium">Expiry Date</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                    No batches yet. Add a batch to track stock.
                                </td>
                            </tr>
                        ) : (
                            batches.map((batch) => (
                                <tr key={batch.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{batch.batchNumber || '-'}</td>
                                    <td className="px-4 py-3 text-slate-700 font-semibold">{Number(batch.quantity ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 3 })}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {batch.manufacturingDate ? new Date(batch.manufacturingDate).toLocaleDateString('en-IN') : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {batch.expiryDate ? new Date(batch.expiryDate).toLocaleDateString('en-IN') : '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDelete(batch.id)}
                                            disabled={loading}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
