import { useEffect, useMemo, useState } from 'react'
import { PlusCircle, Edit3, Trash2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../components/LoadingSpinner'
import { createVehicle, deleteVehicle, fetchVehicles, updateVehicle } from '../services/vehicleService'

function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const loadVehicles = async () => {
    setLoading(true)
    try {
      const data = await fetchVehicles()
      setVehicles(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.plate_number}`.toLowerCase().includes(search.toLowerCase()))
  }, [vehicles, search])

  const openModal = (vehicle = null) => {
    setSelectedVehicle(vehicle)
    reset(vehicle || { make: '', model: '', year: '', plate_number: '', color: '' })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedVehicle(null)
    setIsModalOpen(false)
  }

  const handleSave = async (values) => {
    try {
      if (selectedVehicle) {
        await updateVehicle(selectedVehicle.id, values)
        setVehicles((prev) => prev.map((item) => (item.id === selectedVehicle.id ? { ...item, ...values } : item)))
      } else {
        const newVehicle = await createVehicle(values)
        setVehicles((prev) => [...prev, { id: newVehicle?.id, ...values }])
      }
      closeModal()
      await loadVehicles()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (vehicleId) => {
    await deleteVehicle(vehicleId)
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Vehicles</h1>
              <p className="mt-2 text-sm text-slate-500">Manage the vehicles tied to your breakdown support account.</p>
            </div>
            <button onClick={() => openModal()} className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              <PlusCircle size={18} />
              Add Vehicle
            </button>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vehicles" className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
            </div>

            {loading ? <LoadingSpinner /> : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full table-auto text-left text-sm text-slate-700">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-4">Vehicle</th>
                      <th className="py-4">Plate</th>
                      <th className="py-4">Year</th>
                      <th className="py-4">Color</th>
                      <th className="py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                        <td className="py-4 font-semibold text-slate-900">{vehicle.make} {vehicle.model}</td>
                        <td className="py-4">{vehicle.plate_number}</td>
                        <td className="py-4">{vehicle.year}</td>
                        <td className="py-4">{vehicle.color || '—'}</td>
                        <td className="py-4 flex items-center gap-2">
                          <button onClick={() => openModal(vehicle)} className="inline-flex h-10 items-center gap-2 rounded-3xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100">
                            <Edit3 size={16} /> Edit
                          </button>
                          <button onClick={() => handleDelete(vehicle.id)} className="inline-flex h-10 items-center gap-2 rounded-3xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700 hover:bg-red-100">
                            <Trash2 size={16} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <h2 className="text-xl font-semibold text-slate-900">{selectedVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
                <p className="mt-1 text-sm text-slate-500">Store the vehicle details needed to file a breakdown request.</p>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>

            <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Make</span>
                  <input {...register('make', { required: 'Make is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  {errors.make && <p className="mt-2 text-sm text-red-500">{errors.make.message}</p>}
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Model</span>
                  <input {...register('model', { required: 'Model is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  {errors.model && <p className="mt-2 text-sm text-red-500">{errors.model.message}</p>}
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Year</span>
                  <input type="number" {...register('year', { required: 'Year is required', valueAsNumber: true })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  {errors.year && <p className="mt-2 text-sm text-red-500">{errors.year.message}</p>}
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Plate number</span>
                  <input {...register('plate_number', { required: 'Plate number is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  {errors.plate_number && <p className="mt-2 text-sm text-red-500">{errors.plate_number.message}</p>}
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Color</span>
                <input {...register('color')} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex h-12 items-center justify-center rounded-3xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Save vehicle</button>
                <button type="button" onClick={closeModal} className="inline-flex h-12 items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vehicles
