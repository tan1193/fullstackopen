import { useState } from 'react'

const Statistics = ({ text, count }) => {
  return (
    <tr>
      <td>{text}</td><td>{count}</td>
    </tr>
  )
}

const Head = () => <div><h1>Give feedback</h1></div>
const Buttons = ({ callback, text }) => <button onClick={callback}>{text}</button>

const StatisticsOverall = ({ data }) => {
  const { good, neutral, bad } = data
  let all = good + neutral + bad
  let average = all / 3
  average = average.toFixed(1)
  let positive = (all === 0 ? 0 : ((good / all) * 100))
  positive = positive.toFixed(1)

  if (all) {
    return (
      <div className='tblContainer'>
        <table>
          <tbody>
            <tr>
              <th>All</th>
              <td>{all}</td>
            </tr>
            <tr>
              <th>Average</th>
              <td>{average}</td>
            </tr>
            <tr>
              <th>Positive</th>
              <td>{positive}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}


const StatTitle = (prop) => <div><h1>{prop.text}</h1></div>



const App = () => {
  // save clicks of each button to its own state
  const [good, setToGood] = useState(0)
  const [neutral, setToNeutral] = useState(0)
  const [bad, setToBad] = useState(0)

  const setGood = () => {
    setToGood(good + 1)
  }

  function setBad() {
    setToBad(bad + 1)
  }

  function setNeutral() {
    setToNeutral(neutral + 1)
  }



  return (
    <div>
      <Head />
      <Buttons callback={setGood} text="Good" />
      <Buttons callback={setNeutral} text="Neutral" />
      <Buttons callback={setBad} text="Bad" />

      <StatTitle text="Statistics" />
      <div className='tblContainer'>
        <table>
          <tbody>
            <Statistics text="Good" count={good} />
            <Statistics text="Neutral" count={neutral} />
            <Statistics text="Bad" count={bad} />
          </tbody>
        </table>
      </div>
      <StatisticsOverall data={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  )
}

export default App