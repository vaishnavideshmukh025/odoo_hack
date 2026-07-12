import { useEffect, useMemo, useState } from 'react'
import { PlusCircle, Edit3, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService'
import LoadingSpinner from '../components/LoadingSpinner'

function Departments() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const pageSize = 6

  useEffect(() => {
    const loadDepartments = async () => {
      setLoading(true)
      try {
        const data = await fetchDepartments()
        setDepartments(data || [])
      } finally {
        setLoading(false)
      }
    }

    loadDepartments()
  }, [])

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => department.name.toLowerCase().includes(search.toLowerCase()))
  }, [departments, search])

  const paginatedDepartments = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredDepartments.slice(start, start + pageSize)
  }, [filteredDepartments, page])

  const openModal = (department = null) => {
    setSelectedDepartment(department)
    reset(department || { name: '' })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedDepartment(null)
    setIsModalOpen(false)
  }

  const handleSave = async (values) => {
    try {
      if (selectedDepartment) {
        await updateDepartment(selectedDepartment.id, values)
        setDepartments((prev) => prev.map((item) => (item.id === selectedDepartment.id ? { ...item, ...values } : item)))
      } else {
        const newDepartment = await createDepartment(values)
        setDepartments((prev) => [...prev, newDepartment])
      }
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (departmentId) => {
    await deleteDepartment(departmentId)
    setDepartments((prev) => prev.filter((department) => department.id !== departmentId))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Departments</h1>
              <p className="mt-2 text-sm text-slate-500">Manage the departments that support your asset workflows.</p>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <PlusCircle size={18} />
              Add Department
            </button>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search departments"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full table-auto text-sm text-slate-700">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-4 text-left">Department</th>
                      <th className="py-4 text-left">Manager</th>
                      <th className="py-4 text-left">Team size</th>
                      <th className="py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDepartments.map((department) => (
                      <tr key={department.id} className="border-b border-slate-200 last:border-b-0">
                        <td className="py-4">{department.name}</td>
                        <td className="py-4">{department.manager || 'TBA'}</td>
                        <td className="py-4">{department.teamSize ?? '-'}</td>
                        <td className="py-4 flex items-center gap-2">
                          <button
                            onClick={() => openModal(department)}
                            className="inline-flex h-10 items-center gap-2 rounded-3xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            <Edit3 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(department.id)}
                            className="inline-flex h-10 items-center gap-2 rounded-3xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700 hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">Showing {paginatedDepartments.length} of {filteredDepartments.length} departments</p>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 p-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-slate-600">{page}</span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page * pageSize >= filteredDepartments.length}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{selectedDepartment ? 'Edit Department' : 'Add Department'}</h2>
                <p className="mt-1 text-sm text-slate-500">Use this form to manage department records.</p>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>

            <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Department name</span>
                <input
                  type="text"
                  {...register('name', { required: 'Department name is required' })}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex h-12 items-center justify-center rounded-3xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                  Save department
                </button>
                <button type="button" onClick={closeModal} className="inline-flex h-12 items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Departments
