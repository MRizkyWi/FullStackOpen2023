const Country = ({country}) => {
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      {country.flag}
    </div>
    
  )
}

export default Country