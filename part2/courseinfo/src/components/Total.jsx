function Total({course}) {
  const total = course.parts.reduce((s,p) => s+p.exercises, 0)
  return (
    <div>
      <b>Number of exercises {total}</b>
    </div>
  )
}

export default Total