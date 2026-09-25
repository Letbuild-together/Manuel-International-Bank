'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [queue, setQueue] = useState<any>({ users: [], transactions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mib_token');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/admin/review-queue`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data) setQueue(payload.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Admin portal</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Operations and compliance review</h1>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Back</Link>
        </header>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">Loading review queue...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-900">KYC review</h2>
              <div className="mt-5 space-y-4">
                {queue.users?.length ? (
                  queue.users.map((user: any) => (
                    <div key={user.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="font-medium text-slate-800">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-orange-600">{user.kycStatus}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No KYC review items pending.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-900">Transaction review</h2>
              <div className="mt-5 space-y-4">
                {queue.transactions?.length ? (
                  queue.transactions.map((tx: any) => (
                    <div key={tx.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="font-medium text-slate-800">{tx.type}</p>
                      <p className="text-sm text-slate-500">Reference: {tx.reference}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-orange-600">{tx.status}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No transaction escalations pending.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
