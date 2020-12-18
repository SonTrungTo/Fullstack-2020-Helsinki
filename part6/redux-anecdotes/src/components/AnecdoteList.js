import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import _ from 'lodash';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => _.orderBy(state, 'votes', 'desc'));
    const dispatch = useDispatch();

    const vote = (id) => {
        console.log('vote', id);
        dispatch(upvote(id));
    };

    return (
        <div>
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
        </div>
    );
};

export default AnecdoteList;