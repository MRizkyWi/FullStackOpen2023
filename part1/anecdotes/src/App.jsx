import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const handleClick = () => {
    const updatedSelected = Math.floor(Math.random() * 8)
    setSelected(updatedSelected)
  }

  const handleVoteClick = () => {
    const copy = [...vote]
    const updatedSelectedCount = copy[selected] + 1
    copy[selected]+=1
    setVote(copy)
    if (selected !== indexMax) {
      if (updatedSelectedCount > vote[indexMax]) {
        setIndexMax(selected)
      }
    }
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [indexMax, setIndexMax] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(anecdotes.length))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <p><Button handleClick={handleVoteClick} text="vote"/></p>
      <p><Button handleClick={handleClick} text="next anecdotes"/></p>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexMax]}
      <p>has {vote[indexMax]} votes</p>
    </div>
  )
}

export default App