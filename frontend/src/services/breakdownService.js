import api, { getApiPayload } from './apiService'

export const fetchBreakdownRequests = async () => {
  const response = await api.get('/breakdown-requests')
  return getApiPayload(response)
}

export const createBreakdownRequest = async (payload) => {
  const response = await api.post('/breakdown-requests', payload)
  return getApiPayload(response)
}

export const updateBreakdownRequest = async (id, payload) => {
  const response = await api.put(`/breakdown-requests/${id}`, payload)
  return getApiPayload(response)
}
