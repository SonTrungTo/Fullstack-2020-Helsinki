import React from 'react';
import { connect } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import _ from 'lodash';

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        console.log('vote', anecdote.id);
        props.upvote(anecdote.id, anecdote);
        props.setNotification(`You voted '${anecdote.content}'`, 5);
    };

    return (
        <div>
            {props.filteredAnecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    const anecdotes = _.orderBy(state.anecdotes, 'votes', 'desc');
    if (state.filter.length === 0) {
        return {
            filteredAnecdotes: anecdotes
        };
    }
    const filteredAnecdotes =
    anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
    return {
        filteredAnecdotes
    };
};

const mapDispatchToProps = {
    upvote, setNotification
};

const connectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);

export default connectedAnecdoteList;