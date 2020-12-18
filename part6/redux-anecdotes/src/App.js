import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from './reducers/anecdoteReducer';
import _ from 'lodash';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
    const anecdotes = useSelector(state => _.orderBy(state, 'votes', 'desc'));
    const dispatch = useDispatch();

    const vote = (id) => {
        console.log('vote', id);
        dispatch(upvote(id));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <AnecdoteForm />
        </div>
    );
};

export default App;