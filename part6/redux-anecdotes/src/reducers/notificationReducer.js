const initialState = {
    message: 'This app information is controlled by a store named Redux',
    display: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'VOTE_MESSAGE': {
        return {
            display: true,
            message: `You voted '${action.data.content}'`
        };
    }
    case 'NEW_ANECDOTE_MESSAGE': {
        return {
            display: true,
            message: `'${action.data.content}' is created`
        };
    }
    case 'REMOVE_MESSAGE': {
        return {
            message: '',
            display: false
        };
    }
    default:
        return state;
    }
};

export const upvoteMessage = ({ content }) => {
    return {
        type: 'VOTE_MESSAGE',
        data: {
            content
        }
    };
};

export const newAnecdoteMessage = (content) => {
    return {
        type: 'NEW_ANECDOTE_MESSAGE',
        data: {
            content
        }
    };
};

export const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE'
    };
};

export default reducer;