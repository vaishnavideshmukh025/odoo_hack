import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchMechanics } from '../services/mechanicService'

function Mechanics() {
  const [mechanics, setMechanics] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadMechanics = async () => {
      setLoading(true)
      try {
        const data = await fetchMechanics()
        setMechanics(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    }

    loadMechanics()
  }, [])

  const filteredMechanics = mechanics.filter((mechanic) => `${mechanic.name} ${mechanic.specialization || ''}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Mechanics</h1>
            <p className="mt-2 text-sm text-slate-500">Browse verified mechanics that can support your breakdown requests.</p>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search mechanics" className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            </div>

            {loading ? <LoadingSpinner /> : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredMechanics.map((mechanic) => (
                  <div key={mechanic.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{mechanic.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{mechanic.specialization || 'General repair'}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${mechanic.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {mechanic.is_available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-slate-600">Phone: {mechanic.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Mechanics
