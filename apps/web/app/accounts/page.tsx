'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const statCards = [
  { label: 'Total balance', value: '$385,501.42', tone: 'text-slate-900' },
  { label: 'Monthly inflow', value: '$24,120.00', tone: 'text-emerald-600' },
  { label: 'Pending transfers', value: '$8,400.00', tone: 'text-orange-600' },
];

const initialAccounts = [
  { id: 'acc_001', name: 'Main checking', iban: '•••• 4201', balance: '$42,860.12' },
  { id: 'acc_002', name: 'USD savings', iban: '•••• 2846', balance: '$124,200.40' },
  { id: 'acc_003', name: 'International account', iban: '•••• 9982', balance: '$214,440.90' },
];

const initialTransactions = [
  { id: 'txn_001', name: 'Payroll Deposit', date: 'Today, 9:42 AM', amount: '+$8,540.00', positive: true },
  { id: 'txn_002', name: 'Transfer to Global Ops', date: 'Yesterday, 3:15 PM', amount: '-$1,200.00', positive: false },
  { id: 'txn_003', name: 'Foreign exchange', date: 'Mon, 9:03 AM', amount: '-$540.90', positive: false },
  { id: 'txn_004', name: 'Client reimbursement', date: 'Sun, 6:12 PM', amount: '+$1,850.00', positive: true },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
    const token = localStorage.getItem('mib_token');
    const savedUser = localStorage.getItem('mib_user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    async function loadDashboard() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/accounts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const payload = await res.json();
          if (payload?.data && Array.isArray(payload.data)) {
            setAccounts(
              payload.data.map((acc: any) => ({
                id: acc.id,
                name: acc.type,
                iban: acc.iban,
                balance: `$${Number(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              })),
            );
          }
        }

        const txRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (txRes.ok) {
          const txPayload = await txRes.json();
          if (txPayload?.data && Array.isArray(txPayload.data)) {
            setTransactions(
              txPayload.data.map((tx: any) => ({
                id: tx.id,
                name: tx.description ?? tx.type,
                date: new Date(tx.createdAt).toLocaleString(),
                amount: `${tx.type === 'DEPOSIT' ? '+' : '-'}$${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                positive: tx.type === 'DEPOSIT',
              })),
            );
          }
        }
      } catch (err) {
        console.error('Dashboard load failed', err);
      }
    }

    loadDashboard();
  }, [router]);

  const greeting = useMemo(() => {
    if (!user) return 'Customer';
    return `${user.firstName ?? 'Customer'} ${user.lastName ?? ''}`.trim();
  }, [user]);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Good morning, {greeting}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/accounts" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Accounts</Link>
            <Link href="/transfer" className="rounded-xl bg-bank-600 px-4 py-2 text-sm font-medium text-white hover:bg-bank-700">Transfer</Link>
            <Link href="/statements" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-bank-500 hover:text-bank-700">Statements</Link>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {statCards.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className={`mt-4 text-3xl font-semibold ${item.tone}`}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Accounts</h2>
              <Link href="/accounts" className="text-sm font-medium text-bank-700">Manage</Link>
            </div>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-medium text-slate-800">{account.name}</p>
                    <p className="text-sm text-slate-500">{account.iban}</p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">{account.balance}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">Priority actions</h2>
            <ul className="mt-5 space-y-4 text-sm text-slate-600">
              <li>• Review pending international transfers</li>
              <li>• Confirm weekly treasury allocation</li>
              <li>• Approve KYC refresh for new client</li>
              <li>• Schedule recurring payroll transfer</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent activity</h3>
            <Link href="/statements" className="text-sm font-medium text-bank-700">View statements</Link>
          </div>
          <div className="space-y-4">
            {transactions.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div>
                  <p className="font-medium text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.date}</p>
                </div>
                <p className={`font-semibold ${item.positive ? 'text-emerald-600' : 'text-slate-800'}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
