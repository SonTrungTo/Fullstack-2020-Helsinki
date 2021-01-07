import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exercisesCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exercisesCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exercisesCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Part 9 of FS2020",
      exercisesCount: 26,
      description: "Typescript and its friends"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content contents={courseParts} />
      <Total total={courseParts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);