import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => 
  <tr>
    <td>{props.text}</td>
    <td>{props.text === "positive" ?
    <span>{props.value}%</span> : <span>{props.value}</span>}</td>
  </tr>;

const Statistics = (props) => {
  const { good, neutral, bad,
  total, average, percentageOfGood } = props;

  return (
    <React.Fragment>
      <h1>statistics</h1>
      { total === 0 ? <div>No feedback given</div> :
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={ good } />
            <Statistic text="neutral" value={ neutral } />
            <Statistic text="bad" value={ bad } />
            <Statistic text="total" value={ total } />
            <Statistic text="average" value={ average } />
            <Statistic text="positive" value={ percentageOfGood } />
          </tbody>
        </table>
      </div>
      }
    </React.Fragment>
  );
};

const Button = (props) => <button onClick={ props.handleClick }>{props.text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const average = () => {
    const total = (good + neutral + bad) === 0 ? 1 : (good + neutral + bad);

    return ((good - bad)/total).toFixed(2);
  };

  const percentageOfGood = () => {
    const total = (good + neutral + bad) === 0 ? 1 : (good + neutral + bad);

    return ((good / total) * 100).toFixed(2);
  };

  const total = () => {
    return (good + neutral + bad);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" handleClick={ handleGood } />
        <Button text="neutral" handleClick={ handleNeutral } />
        <Button text="bad" handleClick={ handleBad } />
      </div>
      <Statistics good={ good }
      neutral={ neutral }
      bad={ bad }
      average={ average() }
      total={ total() }
      percentageOfGood={ percentageOfGood() } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));