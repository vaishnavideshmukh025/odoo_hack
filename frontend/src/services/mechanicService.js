import api, { getApiPayload } from './apiService'

export const fetchMechanics = async () => {
  const response = await api.get('/mechanics')
  return getApiPayload(response)
}
