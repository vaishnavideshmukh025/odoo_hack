function KPIcard({ title, value, icon, subtitle, variant = 'blue' }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${
      variant === 'blue' ? 'text-slate-900' : 'text-slate-900'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
          {icon}
        </div>
      </div>
      {subtitle && <p className="mt-4 text-sm text-slate-500">{subtitle}</p>}
    </div>
  )
}

export default KPIcard
