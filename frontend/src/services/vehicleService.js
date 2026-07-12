import api, { getApiPayload } from './apiService'

export const fetchVehicles = async () => {
  const response = await api.get('/vehicles')
  return getApiPayload(response)
}

export const createVehicle = async (payload) => {
  const response = await api.post('/vehicles', payload)
  return getApiPayload(response)
}

export const updateVehicle = async (id, payload) => {
  const response = await api.put(`/vehicles/${id}`, payload)
  return getApiPayload(response)
}

export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`)
  return getApiPayload(response)
}
