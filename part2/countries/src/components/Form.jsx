const Form = ({searchTerm, searchTermChange}) => {
  return (
    <form>
      <div>
        find countries: <input value={searchTerm} onChange={searchTermChange}/>
      </div>
    </form>
  )
}

export default Form