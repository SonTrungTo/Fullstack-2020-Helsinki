import React, { useState } from 'react';
import loginService from "../services/login";
import blogService from "../services/blogs";

export default function LoginForm({
    setUser, displaySuccessMessage, displayErrorMessage
}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async event => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });
            window.localStorage.setItem('auth', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            displaySuccessMessage(`${user.name} logged in!`);
        } catch (error) {
            displayErrorMessage('Wrong username/password');
        }
    };

    return (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type='text'
                name='username'
                value={username}
                onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input
                type='password'
                name='password'
                value={password}
                onChange={({target}) => setPassword(target.value)} />
            </div>
            <button type='submit'>login</button>
        </form>
    </div>
    );
}