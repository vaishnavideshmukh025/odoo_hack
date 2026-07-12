import { useEffect, useMemo, useState } from 'react'
import { PlusCircle, Edit3, Trash2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../services/authService.jsx'
import LoadingSpinner from '../components/LoadingSpinner'

const mockCategories = [
  { id: 1, name: 'Laptops', description: 'Portable computers' },
  { id: 2, name: 'Monitors', description: 'Display screens' },
  { id: 3, name: 'Accessories', description: 'Keyboards, mice, and more' },
]

function Categories() {
  const [categories, setCategories] = useState(mockCategories)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase()))
  }, [categories, search])

  const openModal = (category = null) => {
    setSelectedCategory(category)
    reset(category || { name: '', description: '' })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedCategory(null)
    setIsModalOpen(false)
  }

  const handleSave = (values) => {
    setLoading(true)
    setTimeout(() => {
      if (selectedCategory) {
        setCategories((prev) => prev.map((item) => (item.id === selectedCategory.id ? { ...item, ...values } : item)))
      } else {
        setCategories((prev) => [{ id: Date.now(), ...values }, ...prev])
      }
      setLoading(false)
      closeModal()
    }, 500)
  }

  const handleDelete = (categoryId) => {
    setCategories((prev) => prev.filter((category) => category.id !== categoryId))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Asset Categories</h1>
              <p className="mt-2 text-sm text-slate-500">Create and maintain reusable asset category groups.</p>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <PlusCircle size={18} />
              Add Category
            </button>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full table-auto text-left text-sm text-slate-700">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-4">Category</th>
                      <th className="py-4">Description</th>
                      <th className="py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                        <td className="py-4 font-semibold text-slate-900">{category.name}</td>
                        <td className="py-4 text-slate-600">{category.description}</td>
                        <td className="py-4 flex items-center gap-2">
                          <button
                            onClick={() => openModal(category)}
                            className="inline-flex h-10 items-center gap-2 rounded-3xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            <Edit3 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{selectedCategory ? 'Edit Category' : 'Add Category'}</h2>
              </div>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>

            <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Category name</span>
                <input
                  type="text"
                  {...register('name', { required: 'Category name is required' })}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Description</span>
                <textarea
                  {...register('description', { required: 'Category description is required' })}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  rows="4"
                />
                {errors.description && <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>}
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex h-12 items-center justify-center rounded-3xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                  Save category
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

export default Categories
