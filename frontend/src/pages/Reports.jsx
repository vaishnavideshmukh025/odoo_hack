function Reports() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>
            <p className="mt-2 text-sm text-slate-500">Review asset performance, audit logs, and usage summaries.</p>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-blue-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Inventory summary</h2>
                <p className="mt-3 text-sm text-slate-600">A snapshot of asset categories, allocation, and availability.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Audit insights</h2>
                <p className="mt-3 text-sm text-slate-600">Track compliance, maintenance checks, and recent operational activity.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reports
