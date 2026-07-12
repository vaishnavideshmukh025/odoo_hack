export const fetchEmployees = async (api, params) => {
  const response = await api.get('/employees', { params })
  return response.data
}

export const fetchEmployeeProfile = async (api, id) => {
  const response = await api.get(`/employees/${id}`)
  return response.data
}
