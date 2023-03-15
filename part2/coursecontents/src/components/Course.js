import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = (props) => {
  const {course} = props
  console.log("props", props)
  console.log("course", course)

  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
