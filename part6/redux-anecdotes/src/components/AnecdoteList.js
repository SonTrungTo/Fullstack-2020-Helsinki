import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { upvoteMessage, removeMessage } from '../reducers/notificationReducer';
import _ from 'lodash';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => _.orderBy(state.anecdotes, 'votes', 'desc'));
    const filter = useSelector(state => state.filter);
    const filteredAnecdotes = filter.length === 0 ? anecdotes :
        anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        dispatch(upvote(anecdote.id, anecdote));
        dispatch(upvoteMessage(anecdote));
        setTimeout(() => {
            dispatch(removeMessage());
        }, 5000);
    };

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
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