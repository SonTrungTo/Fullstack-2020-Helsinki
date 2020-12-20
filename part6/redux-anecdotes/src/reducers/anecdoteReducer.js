import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
    console.log('state now: ', state);
    console.log('action', action);

    switch (action.type) {
    case 'VOTE': {
        const anecdoteToChange = state.find(anecdote => anecdote.id === action.data.id);
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        };
        return state.map(anecdote => anecdote.id === changedAnecdote.id ?
            changedAnecdote : anecdote);
    }
    case 'NEW_ANECDOTE': {
        return state.concat(action.data);
    }
    case 'INIT_ANECDOTES': {
        return action.data;
    }
    default:
        return state;
    }
};

export const upvote = (id, currentObject) => {
    return async dispatch => {
        const newObject = { ...currentObject, votes: currentObject.votes + 1 };
        const updatedAnecdote = await anecdotesService.upVote(id, newObject);
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        });
    };
};

export const createNewAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNew(content);
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        });
    };
};

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdotesService.getAll();
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        });
    };
};

export default reducer;