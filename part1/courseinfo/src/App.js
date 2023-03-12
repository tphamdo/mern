const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => 
        {
          return (<p key={part.name}> 
            {part.name} {part.exercises} 
            </p>
          )
        }
      )}
    </>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <p>Number of exercises { props.parts.reduce((a, part) => a + part.exercises, 0) } </p>
  )
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
