export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-bank-600">Open an account</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Start banking globally</h1>

        <form className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Country</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-bank-500 focus:bg-white">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>United Arab Emirates</option>
              <option>Singapore</option>
            </select>
          </div>
          <button type="submit" className="md:col-span-2 w-full rounded-xl bg-bank-600 px-4 py-3 font-medium text-white transition hover:bg-bank-700">
            Create profile
          </button>
        </form>
      </div>
    </main>
  );
}
