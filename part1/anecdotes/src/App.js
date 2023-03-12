import { useState } from 'react'

const Header = (props) => <h1> {props.value} </h1>

const Button = (props) => {
  return (<button onClick={props.onClick}> {props.text} </button>)
}

const App = () => {
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
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const selectRandom = () => {
    // select random 0,1,...anecdotes.length
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const addVote = () => {
    console.log(votes)
    let newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const mostVoted = votes.indexOf(Math.max(...votes))
  console.log(mostVoted)

  return (
    <div>
      <Header value="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={addVote} text='vote' />
      <Button onClick={selectRandom} text='next anecdote' />
      <Header value="Anecdote with the most votes" />
      <div>{anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

export default App
