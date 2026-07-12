import api, { getApiPayload } from './apiService'

export const createFeedback = async (payload) => {
  const response = await api.post('/feedback', payload)
  return getApiPayload(response)
}
