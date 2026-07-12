import { useEffect, useMemo, useState } from 'react'
import { PlusCircle, Search, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../components/LoadingSpinner'
import { createBreakdownRequest, fetchBreakdownRequests, updateBreakdownRequest } from '../services/breakdownService'
import { fetchVehicles } from '../services/vehicleService'

function Breakdowns() {
  const [requests, setRequests] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const loadData = async () => {
    setLoading(true)
    try {
      const [requestsData, vehiclesData] = await Promise.all([fetchBreakdownRequests(), fetchVehicles()])
      setRequests(Array.isArray(requestsData) ? requestsData : [])
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => `${request.issue_description} ${request.status}`.toLowerCase().includes(search.toLowerCase()))
  }, [requests, search])

  const openModal = () => {
    reset({ vehicle_id: '', latitude: '', longitude: '', issue_description: '' })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSave = async (values) => {
    try {
      await createBreakdownRequest({
        vehicle_id: Number(values.vehicle_id),
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        issue_description: values.issue_description,
      })
      closeModal()
      await loadData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async (requestId) => {
    await updateBreakdownRequest(requestId, { status: 'Resolved' })
    await loadData()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Breakdown Requests</h1>
              <p className="mt-2 text-sm text-slate-500">Report roadside issues and track request progress.</p>
            </div>
            <button onClick={openModal} className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              <PlusCircle size={18} /> Report Breakdown
            </button>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search requests" className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            </div>

            {loading ? <LoadingSpinner /> : (
              <div className="mt-6 space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{request.issue_description}</p>
                        <p className="mt-1 text-sm text-slate-500">Vehicle #{request.vehicle_id} • {request.latitude}, {request.longitude}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{request.status}</span>
                        {request.status !== 'Resolved' && <button onClick={() => handleUpdate(request.id)} className="inline-flex items-center gap-2 rounded-3xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                          <CheckCircle2 size={16} /> Mark resolved
                        </button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Report Breakdown</h2>
                <p className="mt-1 text-sm text-slate-500">Share vehicle and location details so support can respond.</p>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>

            <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Vehicle</span>
                <select {...register('vehicle_id', { required: 'Vehicle is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model} - {vehicle.plate_number}</option>)}
                </select>
                {errors.vehicle_id && <p className="mt-2 text-sm text-red-500">{errors.vehicle_id.message}</p>}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Latitude</span>
                  <input type="number" step="any" {...register('latitude', { required: 'Latitude is required', valueAsNumber: true })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  {errors.latitude && <p className="mt-2 text-sm text-red-500">{errors.latitude.message}</p>}
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Longitude</span>
                  <input type="number" step="any" {...register('longitude', { required: 'Longitude is required', valueAsNumber: true })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  {errors.longitude && <p className="mt-2 text-sm text-red-500">{errors.longitude.message}</p>}
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Issue description</span>
                <textarea {...register('issue_description', { required: 'Issue description is required' })} rows="4" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                {errors.issue_description && <p className="mt-2 text-sm text-red-500">{errors.issue_description.message}</p>}
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex h-12 items-center justify-center rounded-3xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Submit request</button>
                <button type="button" onClick={closeModal} className="inline-flex h-12 items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Breakdowns
