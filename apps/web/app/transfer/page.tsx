'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('mib_token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/accounts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data) {
          setAccounts(payload.data);
        }
      })
      .catch(() => setAccounts([]));
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Accounts</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Banking overview</h1>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Back to dashboard</Link>
        </header>

        <div className="grid gap-6 md:grid-cols-2"> 
          {accounts.length ? (
            accounts.map((account) => (
              <div key={account.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-bank-50 px-2 py-1 text-xs font-medium text-bank-700">{account.type}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{account.status}</span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-slate-900">${Number(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <p className="mt-4 text-sm text-slate-500">IBAN: {account.iban}</p>
                <p className="mt-1 text-sm text-slate-500">Currency: {account.currency}</p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:col-span-2">
              <p className="text-slate-500">No account data available yet. Please log in again or create an account.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
