const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}


const Content = props => {
  return (
    <div>
      {props.parts.map((part, i) => <Part key={i} part={part} />)}
    </div>
  )
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
};

const Total = props => {
  const total = props.parts.reduce((acc, part) => acc + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )

}
export default App