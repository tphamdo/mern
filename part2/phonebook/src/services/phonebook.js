import axios from 'axios'

// axios
//   .get('http://localhost:3001/persons')
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(res => res.data)
}

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}

const put = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)
}

export default { getAll, create, update, put, remove }
