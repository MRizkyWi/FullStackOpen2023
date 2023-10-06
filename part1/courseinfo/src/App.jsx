import { useState } from 'react'
import viteLogo from '/vite.svg'

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

function Header(params) {
  return (
    <div>
      <h1>{params.course.name}</h1>
    </div>
  )
}

function Part(params) {
  return (
    <div>
      <p>{params.part} {params.exercise}</p>
    </div>
  )
}

function Content(params) {
  return(
    <div>
      <Part part={params.course.parts[0].name} exercise={params.course.parts[0].exercises}/>
      <Part part={params.course.parts[1].name} exercise={params.course.parts[1].exercises}/>
      <Part part={params.course.parts[2].name} exercise={params.course.parts[2].exercises}/>
    </div>
  )
}

function Total(params) {
  return (
    <div>
      <p>Number of exercises {params.course.parts[0].exercises + params.course.parts[1].exercises + params.course.parts[2].exercises}</p>
    </div>
  )
}

export default App
