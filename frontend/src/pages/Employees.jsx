import { useEffect, useMemo, useState } from 'react'
import { fetchEmployees } from '../services/employeeService'
import LoadingSpinner from '../components/LoadingSpinner'
import { Search, Filter, User, Briefcase, CheckCircle2 } from 'lucide-react'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true)
      try {
        const data = await fetchEmployees()
        setEmployees(data || [])
      } finally {
        setLoading(false)
      }
    }

    loadEmployees()
  }, [])

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase()) || employee.email.toLowerCase().includes(search.toLowerCase())
      const matchesDepartment = department ? employee.department === department : true
      const matchesStatus = status ? employee.status === status : true
      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [employees, search, department, status])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Employee Directory</h1>
              <p className="mt-2 text-sm text-slate-500">Search and filter your employee roster with ease.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-3xl bg-blue-50 px-4 py-3 text-sm text-blue-700">Total employees: {employees.length}</div>
              <button className="inline-flex h-12 items-center gap-2 rounded-3xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employees"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All departments</option>
                  <option value="Operations">Operations</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </select>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All status</option>
                  <option value="Active">Active</option>
                  <option value="On leave">On leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full table-auto text-left text-sm text-slate-700">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-4">Employee</th>
                      <th className="py-4">Department</th>
                      <th className="py-4">Role</th>
                      <th className="py-4">Status</th>
                      <th className="py-4">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                              <User size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{employee.name}</p>
                              <p className="text-sm text-slate-500">{employee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{employee.department}</td>
                        <td className="py-4">{employee.role}</td>
                        <td className="py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${employee.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="py-4">{employee.phone || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Employees
