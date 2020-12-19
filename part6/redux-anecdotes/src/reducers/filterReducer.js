const initialState = '';

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'FILTER': {
        return initialState.concat(action.data.content);
    }
    default:
        return state;
    }
};

export const filterContent = (content) => {
    return {
        type: 'FILTER',
        data: {
            content
        }
    };
};

export default reducer;