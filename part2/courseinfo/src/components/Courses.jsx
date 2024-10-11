import React from 'react';

const Header = props => {
    console.log(props.course.name);
    return <h1>{props.course.name}</h1>;
  };
  
  const Content = props => {
    console.log(props);
    return (
      <div>
        {props.course.parts.map((part, i) => (
          <Part key={i} part={part} />
        ))}
      </div>
    );
  };
  
  const Part = props => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };
  
  const Total = props => {
    const total = props.course.parts.reduce((acc, part) => acc + part.exercises, 0);
    return <p>total of exercises {total}</p>;
  };
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    );
  };
  
  const Courses = ({ courses }) => {
    return (
      <div>
        {courses.map((course, i) => (
          <Course key={i} course={course} />
        ))}
      </div>
    );
  }

  export default Courses;