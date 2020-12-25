import loginService from '../services/login';
import blogsService from '../services/blogs';
import { displaySuccessMessage,
    displayErrorMessage } from '../reducers/notificationReducer';

const authReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN': {
        return action.data;
    }
    case 'LOGOUT': {
        return action.data;
    }
    case 'INIT_USER': {
        return action.data;
    }
    default:
        return state;
    }
};

export const initializeUser = () => {
    return dispatch => {
        const loggedInUserJSON = window.localStorage.getItem('auth');
        let userData = null;
        if (loggedInUserJSON) {
            userData = JSON.parse(loggedInUserJSON);
            blogsService.setToken(userData.token);
        }
        dispatch({
            type: 'INIT_USER',
            data: userData
        });
    };
};

export const login = (credentials) => {
    return async dispatch => {
        try {
            const userData = await loginService.login(credentials);
            window.localStorage.setItem('auth', JSON.stringify(userData));
            blogsService.setToken(userData.token);
            dispatch({
                type: 'LOGIN',
                data: userData
            });
            dispatch(displaySuccessMessage(`${userData.name} logged in!`, 5));
        } catch (error) {
            dispatch(displayErrorMessage('Wrong username/password', 5));
        }
    };
};

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('auth');
        blogsService.setToken(null);
        dispatch({
            type: 'LOGOUT',
            data: null
        });
        dispatch(displaySuccessMessage('Logged out!', 5));
    };
};

export default authReducer;