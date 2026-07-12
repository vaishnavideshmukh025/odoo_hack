import { useEffect, useState } from 'react'
import { BarChart3, Box, CalendarDays, CheckCircle2, ClipboardList, PlusCircle, Wrench } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import KPIcard from '../components/KPIcard'
import UserProfile from '../components/UserProfile'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../services/authService.jsx'
import { getDashboardMetrics, getNotifications, getRecentActivities } from '../services/dashboardService'

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [metrics, setMetrics] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const { api, user } = useAuth()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [metricsResponse, notificationsResponse, activitiesResponse] = await Promise.all([
          getDashboardMetrics(api),
          getNotifications(api),
          getRecentActivities(api),
        ])

        setMetrics(metricsResponse)
        setNotifications(notificationsResponse)
        setActivities(activitiesResponse)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [api])

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="lg:pl-72">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Welcome back, {user?.name || 'Team'}</h2>
                    <p className="mt-2 text-sm text-slate-500">Your AssetFlow workspace is ready for today.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <button className="rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                      Register Asset
                    </button>
                    <button className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                      Book Resource
                    </button>
                    <button className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                      Raise Maintenance
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <KPIcard title="Assets Available" value={metrics?.assetsAvailable ?? '...'} icon={<Box size={24} />} subtitle="Current available stock" />
                <KPIcard title="Assets Allocated" value={metrics?.assetsAllocated ?? '...'} icon={<ClipboardList size={24} />} subtitle="Active assignments" />
                <KPIcard title="Active Bookings" value={metrics?.activeBookings ?? '...'} icon={<CalendarDays size={24} />} subtitle="Bookings in progress" />
                <KPIcard title="Maintenance Today" value={metrics?.maintenanceToday ?? '...'} icon={<Wrench size={24} />} subtitle="Scheduled checks" />
                <KPIcard title="Upcoming Returns" value={metrics?.upcomingReturns ?? '...'} icon={<CheckCircle2 size={24} />} subtitle="Due this week" />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Recent activities</p>
                    <h3 className="text-xl font-semibold text-slate-900">Activity log</h3>
                  </div>
                </div>

                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="py-3">Activity</th>
                          <th className="py-3">User</th>
                          <th className="py-3">Status</th>
                          <th className="py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities?.map((activity) => (
                          <tr key={activity.id} className="border-b border-slate-200 last:border-b-0">
                            <td className="py-4">{activity.action}</td>
                            <td className="py-4">{activity.user}</td>
                            <td className="py-4 text-slate-600">{activity.status}</td>
                            <td className="py-4">{activity.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <UserProfile user={user} />

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Notifications</p>
                    <h3 className="text-xl font-semibold text-slate-900">Recent updates</h3>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                        <span className="text-xs text-slate-500">{notification.time}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{notification.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
