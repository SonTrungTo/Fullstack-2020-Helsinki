import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => <button onClick={ props.handleClick }>{props.text}</button>;

const Anecdote = ({title, votes, selected, anecdotes}) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>
      { anecdotes[selected] }
      <div>
        has { votes[selected] } { votes[selected] === 1 ? "vote" : "votes" }
      </div>
    </React.Fragment>
  );
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat));

  const randomIndexClick = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const voteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day"
      votes={ votes }
      selected={ selected }
      anecdotes={ props.anecdotes } />
      <div>
        <Button text="Vote" handleClick={ voteClick } />
        <Button text="Next anecdote" handleClick={ randomIndexClick } />
      </div>
      <Anecdote title="Anecdote with most votes"
      votes={ votes }
      selected={ votes.indexOf(Math.max(...votes)) }
      anecdotes={ props.anecdotes } />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={ anecdotes } />, document.getElementById('root'));