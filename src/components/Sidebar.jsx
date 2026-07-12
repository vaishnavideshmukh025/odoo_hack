import { NavLink } from 'react-router-dom'
import {
  Grid,
  Users,
  FolderOpen,
  ClipboardList,
  FileText,
  UserCircle,
  Home,
} from 'lucide-react'

const links = [
  { label: 'Dashboard', to: '/', icon: Home },
  { label: 'Departments', to: '/departments', icon: FolderOpen },
  { label: 'Employees', to: '/employees', icon: Users },
  { label: 'Categories', to: '/categories', icon: ClipboardList },
  { label: 'Profile', to: '/profile', icon: UserCircle },
  { label: 'Reports', to: '/reports', icon: FileText },
]

function Sidebar({ isOpen }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3 text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">AF</div>
          <div>
            <p className="text-sm font-medium">AssetFlow</p>
            <p className="text-xs text-slate-500">ERP platform</p>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-slate-600">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Quick Links</p>
          <p className="mt-2 text-sm leading-6">Access departments, employees, categories, and reports.</p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
