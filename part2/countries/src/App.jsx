import { useEffect, useState } from 'react'
import Form from './components/Form'
import countryService from './services/countries'
import Country from './components/Country'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countryService.getAll()
    .then(countries => {setCountries(countries)})
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const countriesFilter = searchTerm.length === 0
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(searchTerm))

  return (
    <div>
      <Form searchTerm={searchTerm} searchTermChange={handleSearchTermChange}/>
      {
        countriesFilter.length > 10 ? 
        'Too many matches, specify another filter' :
        countriesFilter.length == 1 ?
        <Country country={countriesFilter[0]} /> :
        <ul>
          {countriesFilter.map((country, i) => <li key={i}>{country.name.common}</li>)}
        </ul>
      }
    </div>
  )
}

export default App
