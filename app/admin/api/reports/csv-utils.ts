/** Escape a value for CSV (quotes if contains comma, newline, or quote). */
function escapeCsv(value: string | number | null | undefined): string {
  const s = value == null ? '' : String(value);
  if (/[,"\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Build CSV string from rows (array of arrays). */
export function buildCsv(rows: (string | number | null | undefined)[][]): string {
  return rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
}
