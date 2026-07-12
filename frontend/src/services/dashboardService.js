import api, { getApiPayload } from './apiService'

export const getDashboardMetrics = async () => {
  const [vehiclesResponse, breakdownsResponse, mechanicsResponse] = await Promise.all([
    api.get('/vehicles'),
    api.get('/breakdown-requests'),
    api.get('/mechanics'),
  ])

  return {
    vehicles: getApiPayload(vehiclesResponse)?.length ?? 0,
    breakdowns: getApiPayload(breakdownsResponse)?.length ?? 0,
    mechanics: getApiPayload(mechanicsResponse)?.length ?? 0,
  }
}

export const getRecentActivities = async () => {
  const response = await api.get('/breakdown-requests')
  return (getApiPayload(response) || []).slice(0, 5)
}

export const getNotifications = async () => {
  return [{ id: 1, title: 'System ready', description: 'Your breakdown assistance workspace is connected to the backend.', time: 'Just now' }]
}
