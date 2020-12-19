import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { newAnecdoteMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = event => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createNewAnecdote(content));
        dispatch(newAnecdoteMessage(content));
        setTimeout(() => {
            dispatch(removeMessage());
        }, 5000);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'
                    type='text' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;