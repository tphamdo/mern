import { useState, useEffect } from 'react'
import countriesService from './services/restcountries'

const Filter = ({text, onChange, filter}) => {
  return (
    <div>
      {text} <input onChange={onChange} value={filter}/>
    </div>
  )
}

const Content = ({filter}) => {
  const [countries, setCountries ] = useState(null)
  console.log("content")
  useEffect(() => {
    if (filter === '') 
      return
    console.log("effect")
    countriesService
      .searchByName(filter)
      .then(returnedCountries => {
        console.log(returnedCountries)
        if (returnedCountries.length <= 10) {
          console.log('here21')
          setCountries(returnedCountries)
        } else {
          console.log('here22')
          setCountries(null)
        }
      })
  }, [filter])
  if (!countries) {
    console.log("null")
    return (<div> Too many countries, specify another filter </div>)
  } else {
    console.log('not empty')
    console.log(countries)
    if (countries.length === 1) {
      const country = countries[0]
      return (
        <div>
          <h1> {country.name.common} </h1>
          <div> capital: {country.capital} </div>
          <div> area: {country.area} </div>
          <br />
          <div> <h2>languages: </h2>
            <ul>
              {Object.values(country.languages).map(lang => <li key={lang}> {lang} </li>)}
            </ul>
          </div>
          <img src={country.flags.png} />
        </div>
      )
    } else {
      return (
        countries.map(country =>
          <div key={country.name.common}> yooo: {country.name.common} </div>
        )
      )
    }
  }
  // .catch(_ => {
  //   console.log("no counties found")
  // })
}

function App() {
  const [ filter, setFilter ] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div> 
      <Filter text='find countries' onChange={handleFilter} value={filter} />
      <Content filter={filter}/>
    </div>
  );
}

export default App;
