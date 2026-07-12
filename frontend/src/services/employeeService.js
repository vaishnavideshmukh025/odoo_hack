import api, { getApiPayload } from './apiService'

export const fetchEmployees = async () => {
  const response = await api.get('/admin/users')
  return getApiPayload(response)
}

export const fetchEmployeeProfile = async (id) => {
  const response = await api.get(`/admin/users/${id}`)
  return getApiPayload(response)
}
