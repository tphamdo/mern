const Total = ({parts}) => {
  const total = parts.reduce((sum,part) => sum + part.exercises, 0)

  return (
    <b>
      total of exercises {total}
    </b>
  )
}

export default Total

