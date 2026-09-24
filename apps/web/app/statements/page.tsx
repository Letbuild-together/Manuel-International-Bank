'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function TransferPage() {
  const [form, setForm] = useState({
    fromAccount: 'Main checking',
    recipient: 'Aurelia Santos',
    amount: '2500',
    currency: 'USD',
    memo: 'International vendor settlement',
  });
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Transfer</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Send money securely</h1>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Back</Link>
        </header>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">From account</label>
              <select value={form.fromAccount} onChange={(e) => setForm({ ...form, fromAccount: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500">
                <option>Main checking</option>
                <option>USD savings</option>
                <option>International account</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Recipient</label>
              <input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Amount</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Currency</label>
              <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>AED</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Memo</label>
              <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500" />
            </div>
          </div>

          {done ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Transfer request submitted successfully and pending review.
            </div>
          ) : null}

          <button type="submit" className="mt-6 w-full rounded-xl bg-bank-600 px-4 py-3 font-medium text-white transition hover:bg-bank-700">Submit transfer</button>
        </form>
      </div>
    </main>
  );
}
