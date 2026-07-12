export const fetchDepartments = async (api, params) => {
  const response = await api.get('/departments', { params })
  return response.data
}

export const createDepartment = async (api, data) => {
  const response = await api.post('/departments', data)
  return response.data
}

export const updateDepartment = async (api, id, data) => {
  const response = await api.put(`/departments/${id}`, data)
  return response.data
}

export const deleteDepartment = async (api, id) => {
  const response = await api.delete(`/departments/${id}`)
  return response.data
}
