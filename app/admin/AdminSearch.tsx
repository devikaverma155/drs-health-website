'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminSearchRecord } from '@/lib/admin-search-types';

const SEARCH_LINKS = [
  { label: 'Dashboard', href: '/admin', keywords: ['dashboard', 'home', 'overview', 'stats'] },
  { label: 'Clients', href: '/admin/clients', keywords: ['client', 'company', 'b2b', 'customer', 'gst'] },
  { label: 'Leads (CRM)', href: '/admin/leads', keywords: ['lead', 'crm', 'prospect', 'inquiry', 'sales'] },
  { label: 'Clinic Patients', href: '/admin/clinic-patients', keywords: ['patient', 'clinic', 'doctor', 'health'] },
  { label: 'Employees', href: '/admin/employees', keywords: ['employee', 'staff', 'hr', 'people', 'team'] },
  { label: 'Materials (RM & PM)', href: '/admin/materials', keywords: ['material', 'raw', 'packaging', 'inventory', 'stock', 'rm', 'pm'] },
  { label: 'Raw Material Inventory', href: '/admin/raw-material-inventory', keywords: ['raw inventory', 'raw material'] },
  { label: 'RM & PM Vendor Orders', href: '/admin/vendor-orders', keywords: ['vendor', 'order', 'purchase', 'supplier'] },
  { label: 'Product Master', href: '/admin/products', keywords: ['product', 'item', 'sku', 'catalog'] },
  { label: 'Product Categories', href: '/admin/product-categories', keywords: ['category', 'product category', 'taxonomy'] },
  { label: 'Bill of Material (BOM)', href: '/admin/bom', keywords: ['bom', 'bill of material', 'recipe', 'formula'] },
  { label: 'Production', href: '/admin/production', keywords: ['production', 'batch', 'manufacturing', 'mfg'] },
  { label: 'Finished Goods', href: '/admin/finished-goods', keywords: ['finished', 'fg', 'goods', 'warehouse'] },
  { label: 'Orders & Dispatch', href: '/admin/orders', keywords: ['order', 'dispatch', 'delivery', 'shipment'] },
  { label: 'Reports', href: '/admin/reports', keywords: ['report', 'export', 'csv', 'analytics'] },
  { label: 'User Roles', href: '/admin/roles', keywords: ['role', 'user', 'permission', 'access', 'auth'] },
  { label: 'Content', href: '/admin/content', keywords: ['content', 'blog', 'slideshow', 'combo', 'hero'] },
  { label: 'Settings', href: '/admin/settings', keywords: ['setting', 'config', 'preferences'] },
];

function navMatchesQuery(query: string, label: string, keywords: string[]): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  const labelLower = label.toLowerCase();
  if (labelLower.includes(q)) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  const haystack = [labelLower, ...keywords.map((k) => k.toLowerCase())].join(' ');
  if (tokens.length <= 1) {
    return keywords.some((k) => k.toLowerCase().includes(q)) || haystack.includes(q);
  }
  return tokens.every((t) => haystack.includes(t) || labelLower.includes(t));
}

export function AdminSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<AdminSearchRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageResults = useMemo(() => {
    if (query.trim().length === 0) return [];
    return SEARCH_LINKS.filter(({ label, keywords }) => navMatchesQuery(query, label, keywords));
  }, [query]);

  const fetchRecords = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setRecords([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q.trim())}`);
      if (!res.ok) {
        setRecords([]);
        return;
      }
      const data = (await res.json()) as { records?: AdminSearchRecord[] };
      setRecords(data.records ?? []);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (q.length < 2) {
      setRecords([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      fetchRecords(q);
    }, 320);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchRecords]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(href: string) {
    setQuery('');
    setOpen(false);
    setRecords([]);
    router.push(href);
  }

  const hasQuery = query.trim().length > 0;
  const showPages = hasQuery && pageResults.length > 0;
  const showRecords = hasQuery && query.trim().length >= 2 && (records.length > 0 || loading);
  const showEmpty =
    hasQuery &&
    query.trim().length >= 2 &&
    !loading &&
    pageResults.length === 0 &&
    records.length === 0;

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 min-w-[14rem] md:w-72 lg:w-96">
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search pages, CRM, products, materials…"
          className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full min-w-0"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setRecords([]);
              inputRef.current?.focus();
            }}
            className="text-slate-400 hover:text-slate-600 shrink-0"
            aria-label="Clear search"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && hasQuery && (
        <div className="absolute top-full left-0 mt-1 w-[min(100vw-2rem,28rem)] max-h-[min(70vh,24rem)] overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden">
          {loading && (
            <div className="px-4 py-2 text-xs text-slate-500 border-b border-slate-100">Searching…</div>
          )}

          {showPages && (
            <div className="py-1">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Pages
              </p>
              {pageResults.map(({ label, href }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => handleSelect(href)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {showRecords && (
            <div className={`py-1 ${showPages ? 'border-t border-slate-100' : ''}`}>
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Records
              </p>
              {records.map((r) => (
                <button
                  key={`${r.kind}-${r.id}`}
                  type="button"
                  onClick={() => handleSelect(r.href)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                >
                  <span className="text-[10px] font-medium uppercase text-slate-400">{r.kind}</span>
                  <div className="font-medium text-slate-900 truncate">{r.title}</div>
                  {r.subtitle ? (
                    <div className="text-xs text-slate-500 truncate mt-0.5">{r.subtitle}</div>
                  ) : null}
                </button>
              ))}
            </div>
          )}

          {showEmpty && (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              No matches for &quot;{query.trim()}&quot;
              <p className="text-xs text-slate-400 mt-2">Try another name, email, phone, code, or batch number.</p>
            </div>
          )}

          {hasQuery && query.trim().length === 1 && pageResults.length === 0 && (
            <div className="px-4 py-3 text-xs text-slate-500">Type at least 2 characters to search records.</div>
          )}
        </div>
      )}
    </div>
  );
}
