'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@manuelbank.com');
  const [password, setPassword] = useState('P@ssword123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json();

      if (!res.ok || !payload.data?.accessToken) {
        throw new Error(payload.message ?? 'Login failed.');
      }

      localStorage.setItem('mib_token', payload.data.accessToken);
      localStorage.setItem('mib_user', JSON.stringify(payload.data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-bank-600">Manuel International Bank</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Secure account access for personal and business customers.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-bank-600 px-4 py-3 font-medium text-white transition hover:bg-bank-700 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <a href="/register" className="font-medium text-bank-700">Open an account</a>
        </p>
      </div>
    </main>
  );
}
