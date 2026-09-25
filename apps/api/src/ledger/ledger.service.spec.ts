'use client';

import Link from 'next/link';
import { useState } from 'react';

const initialBeneficiaries = [
  { id: 'b_001', name: 'Aurelia Santos', bank: 'BWF International', country: 'Portugal' },
  { id: 'b_002', name: 'Elijah Johnson', bank: 'Premier Trust', country: 'United States' },
];

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [form, setForm] = useState({ name: '', bank: '', country: '' });

  function addBeneficiary() {
    if (!form.name.trim()) return;
    setBeneficiaries((current) => [
      { id: `b_${Date.now()}`, name: form.name, bank: form.bank || 'Not listed', country: form.country || 'N/A' },
      ...current,
    ]);
    setForm({ name: '', bank: '', country: '' });
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Beneficiaries</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Saved recipients</h1>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Back</Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">Add beneficiary</h2>
            <div className="mt-5 space-y-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Beneficiary name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500" />
              <input value={form.bank} onChange={(e) => setForm({ ...form, bank: e.target.value })} placeholder="Bank name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500" />
              <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-bank-500" />
              <button onClick={addBeneficiary} className="w-full rounded-xl bg-bank-600 px-4 py-3 font-medium text-white transition hover:bg-bank-700">Save beneficiary</button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">Saved recipients</h2>
            <div className="mt-5 space-y-4">
              {beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-medium text-slate-800">{beneficiary.name}</p>
                    <p className="text-sm text-slate-500">{beneficiary.bank}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{beneficiary.country}</p>
                  </div>
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700">Transfer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
