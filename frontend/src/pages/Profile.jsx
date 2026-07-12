import { useAuth } from '../services/authService.jsx'

function Profile() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
            <p className="mt-2 text-sm text-slate-500">Review and update your account details.</p>
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-500">User details</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{user?.name || 'User Name'}</h2>
                <p className="mt-2 text-sm text-slate-600">{user?.email || 'email@example.com'}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{user?.role || 'Employee'}</p>
                <p className="mt-4 text-sm text-slate-600">Manage your account details and roadside support preferences.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
