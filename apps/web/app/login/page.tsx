export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Manuel International Bank</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Securely access your accounts and payments.</p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input type="email" defaultValue="demo@manuelbank.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" defaultValue="P@ssword123" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white" />
          </div>

          <button type="submit" className="w-full rounded-xl bg-bank-600 px-4 py-3 font-medium text-white transition hover:bg-bank-700">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
