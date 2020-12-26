import React from 'react';
import { Alert } from '@material-ui/lab';

export default function Notification({ message, isSuccess }) {
    const classState = isSuccess ? 'success' : 'error';
    if (message === null) {
        return null;
    }

    return (
        <Alert severity={ classState }>
            {message}
        </Alert>
    );
}