import React from 'react';
import { useDispatch } from 'react-redux';
import anecdotesService from '../services/anecdotes';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { newAnecdoteMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async event => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        const newAnecdote = await anecdotesService.createNew(content);
        dispatch(createNewAnecdote(newAnecdote));
        dispatch(newAnecdoteMessage(newAnecdote.content));
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