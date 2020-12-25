import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import authReducer from './reducers/authReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    userData: authReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store;