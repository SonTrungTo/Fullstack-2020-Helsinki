import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello, {props.name}. You are {props.age} years old. </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <div>
      <p> Greetings </p>
      <Hello name="Luke" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));