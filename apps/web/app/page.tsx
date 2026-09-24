'use client';

import Link from 'next/link';
import { useState } from 'react';

const statements = [
  { id: 'ST-1042', period: 'January 2026', total: '$94,280.00', status: 'Available' },
  { id: 'ST-1037', period: 'December 2025', total: '$89,110.25', status: 'Available' },
  { id: 'ST-1032', period: 'November 2025', total: '$82,930.60', status: 'Available' },
];

export default function StatementsPage() {
  const [downloading, setDownloading] = useState(false);

  function downloadStatement() {
    setDownloading(true);

    const rows = [
      ['Date', 'Description', 'Amount', 'Balance'],
      ['2026-01-03', 'Payroll credit', '+8540.00', '42860.12'],
      ['2026-01-06', 'Travel expense', '-1200.00', '41660.12'],
      ['2026-01-12', 'FX conversion', '-540.90', '41119.22'],
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'manuel-bank-statement-january-2026.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloading(false), 600);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Statements</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Download account statements</h1>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Back</Link>
        </header>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Available statements</h2>
            <button onClick={downloadStatement} className="rounded-xl bg-bank-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-bank-700 disabled:cursor-not-allowed disabled:opacity-70" disabled={downloading}>
              {downloading ? 'Preparing PDF...' : 'Download latest'}
            </button>
          </div>

          <div className="space-y-4">
            {statements.map((statement) => (
              <div key={statement.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">{statement.period}</p>
                  <p className="text-sm text-slate-500">Statement ID: {statement.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-slate-900">{statement.total}</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{statement.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
