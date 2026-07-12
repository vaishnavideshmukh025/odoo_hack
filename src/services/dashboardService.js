export const getDashboardMetrics = async (api) => {
  const response = await api.get('/dashboard/metrics')
  return response.data
}

export const getRecentActivities = async (api) => {
  const response = await api.get('/dashboard/recent-activities')
  return response.data
}

export const getNotifications = async (api) => {
  const response = await api.get('/dashboard/notifications')
  return response.data
}
