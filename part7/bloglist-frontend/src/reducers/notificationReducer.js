const initialState = {
    message: null,
    isSuccess: false
};
let timer;

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'CREATE_SUCCESS_MESSAGE': {
        return {
            message: action.data,
            isSuccess: true
        };
    }
    case 'CREATE_ERROR_MESSAGE': {
        return {
            message: action.data,
            isSuccess: false
        };
    }
    case 'REMOVE_MESSAGE': {
        return {
            ...state,
            message: null
        };
    }
    default:
        return state;
    }
};

export const displaySuccessMessage = (message, timeInSecond) => {
    return dispatch => {
        clearTimeout(timer);
        dispatch({
            type: 'CREATE_SUCCESS_MESSAGE',
            data: message
        });
        timer = setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE'
            });
        }, timeInSecond * 1000);
    };
};

export const displayErrorMessage = (message, timeInSecond) => {
    return dispatch => {
        clearTimeout(timer);
        dispatch({
            type: 'CREATE_ERROR_MESSAGE',
            data: message
        });
        timer = setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE'
            });
        }, timeInSecond * 1000);
    };
};

export default notificationReducer;