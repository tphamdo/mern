import { useState } from 'react'

const Header = (props) => <h1> {props.value} </h1>

const Button = (props) => {
  const {onClick, text} = props
  return (
    <button onClick={onClick}> {text} </button>
  )
}

const StatisticsLine = (props) => {
  const {stat, value} = props;

  return (
    <tr><td>{stat}</td><td>{value}</td></tr>
  )
}

const Statistics = ({clicks}) => {
  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good - clicks.bad) / total
  const posPercentage = clicks.good / total * 100;

  if (total === 0) {
    return (
      <div> No feedback given </div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticsLine value={clicks.good} stat='good' />
          <StatisticsLine value={clicks.neutral} stat='neutral' />
          <StatisticsLine value={clicks.bad} stat='bad' />
          <StatisticsLine value={total} stat='all' />
          <StatisticsLine value={average} stat='average' />
          <StatisticsLine value={posPercentage + '%'} stat='positive' />
        </tbody>
      </table>
    )
  }
}
const App = () => {
  const [clicks, setClicks] = useState(
    {good:0, neutral:0, bad:0}
  )

  const AddToGood = () => setClicks({...clicks, good:clicks.good+1})
  const AddToNeutral = () => setClicks({...clicks, neutral:clicks.neutral+1})
  const AddToBad = () => setClicks({...clicks, bad:clicks.bad+1})

  return  ( 
    <>
      <Header value='give feedback' />
      <Button onClick={AddToGood} text='good' />
      <Button onClick={AddToNeutral} text='neutral' />
      <Button onClick={AddToBad} text='bad' />
      <Header value='statistics' />
      <Statistics clicks={clicks}/>
    </>
  );
}

export default App;
