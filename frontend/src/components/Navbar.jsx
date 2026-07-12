import { Link, useLocation } from 'react-router-dom'
import { Menu, LogOut, Bell, Search } from 'lucide-react'
import { useAuth } from '../services/authService.jsx'

function Navbar({ onToggleSidebar }) {
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 bg-white/95 border-b border-slate-200 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-sm font-medium text-slate-600">{location.pathname.replace('/', '') || 'Dashboard'}</p>
            <h1 className="text-lg font-semibold text-slate-900">AssetFlow ERP</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Search size={16} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search assets, departments..."
              className="w-52 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
            <Bell size={20} />
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
