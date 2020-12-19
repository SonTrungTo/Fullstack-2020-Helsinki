import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { upvoteMessage, removeMessage } from '../reducers/notificationReducer';
import _ from 'lodash';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => _.orderBy(state.anecdotes, 'votes', 'desc'));
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        dispatch(upvote(anecdote.id));
        dispatch(upvoteMessage(anecdote));
        setTimeout(() => {
            dispatch(removeMessage());
        }, 5000);
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;