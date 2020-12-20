import React from 'react';
import { connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

    const addAnecdote = async event => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        props.createNewAnecdote(content);
        props.setNotification(`new anecdote '${content}'`, 5);
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

const mapDispatchToProps = {
    createNewAnecdote, setNotification
};

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm);

export default connectedAnecdoteForm;