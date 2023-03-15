import axios from 'axios'

const baseUrl = `https://restcountries.com/v3.1/`

const searchByName = (name) => {
  return axios.get(`${baseUrl}name/${name}`).then(res => res.data)
}

export default { searchByName }
