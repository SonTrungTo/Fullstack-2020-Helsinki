import React, { useEffect } from 'react';
import { useField } from '../hooks/index';
import { LOGIN } from '../queries';
import { useMutation } from '@apollo/client';

const LoginForm = ({ show, setError, setToken, setPage }) => {
    const username = useField('username');
    const password = useField('password');
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        }
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            localStorage.setItem('auth', token);
            setToken(token);
            setPage('authors');
        }
    }, [result.data]); // eslint-disable-line

    const handleLogin = event => {
        event.preventDefault();
        login({ variables: { username: username.value, password: password.value } });
        username.reset();
        password.reset();
    };

    if (!show) {
        return null;
    }

    return (
        <div>
            <form onSubmit={ handleLogin }>
                <div>
                    username <input { ...username } reset='' />
                </div>
                <div>
                    password <input { ...password } reset='' />
                </div>
                <button>login</button>
            </form>
        </div>
    );
};

export default LoginForm;