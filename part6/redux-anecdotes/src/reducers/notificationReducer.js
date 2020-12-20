const initialState = {
    message: 'This app information is controlled by a store named Redux',
    display: true
};
let timer;

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_MESSAGE': {
        return {
            display: true,
            message: action.data
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

export const setNotification = (message, timeInSecond) => {
    return dispatch => {
        clearTimeout(timer);
        dispatch({
            type: 'SET_MESSAGE',
            data: message
        });
        timer = setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE'
            });
        }, timeInSecond * 1000);
    };
};

export default reducer;