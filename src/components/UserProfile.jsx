import { UserCircle2, Mail, Phone, Briefcase } from 'lucide-react'

function UserProfile({ user }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <UserCircle2 size={34} />
        </div>
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h2 className="text-xl font-semibold text-slate-900">{user?.name || 'User Name'}</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Mail size={16} />
            <p className="text-xs uppercase tracking-[0.2em]">Email</p>
          </div>
          <p className="mt-3 text-sm text-slate-700">{user?.email || 'email@example.com'}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Phone size={16} />
            <p className="text-xs uppercase tracking-[0.2em]">Status</p>
          </div>
          <p className="mt-3 text-sm text-slate-700">Active</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
