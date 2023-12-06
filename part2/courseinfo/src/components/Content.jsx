import Part from "./Part"

function Content(params) {
  return(
    <div>
      {params.course.parts.map((part) => <Part part={part.name} exercise={part.exercises}/>)}
    </div>
  )
}

export default Content