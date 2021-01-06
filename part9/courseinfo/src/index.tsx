import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exercisesCount: 10
    },
    {
      name: "Using props to pass data",
      exercisesCount: 7
    },
    {
      name: "Deeper type usage",
      exercisesCount: 14
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