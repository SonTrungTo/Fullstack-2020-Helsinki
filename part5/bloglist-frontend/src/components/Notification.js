import React from 'react';

export default function Notification({ message, isSuccess }) {
    const classState = isSuccess ? 'success' : 'error';
    if (message === null) {
        return null;
    }

    return (
        <p className={ classState }>
            {message}
        </p>
    );
}