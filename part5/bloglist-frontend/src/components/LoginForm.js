import React, { useState } from 'react';

export default function LoginForm({
    loginUser
}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = event => {
        event.preventDefault();

        loginUser({ username, password });
        setUsername('');
        setPassword('');
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
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                password
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit' id='submit'>login</button>
            </form>
        </div>
    );
}