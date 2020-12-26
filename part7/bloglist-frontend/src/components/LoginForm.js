import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '600',
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    textField: {
        textAlign: 'center'
    },
    submitButton: {
        textAlign: 'center',
        marginTop: theme.spacing(2.5)
    },
    title: {
        color: 'blue',
        textAlign: 'center',
        margin: `${theme.spacing(2.5)}px ${theme.spacing(3)}px
        ${theme.spacing(2)}px`
    }
}));

export default function LoginForm({
    loginUser
}) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = event => {
        event.preventDefault();

        loginUser({ username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <Card className={ classes.card }>
            <Typography variant='h6' className={ classes.title }>
                log in to application
            </Typography>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className={ classes.textField }>
                        <TextField
                            type='text'
                            name='username'
                            id='username'
                            label='username'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)} />
                        <br />
                        <TextField
                            type='password'
                            name='password'
                            label='password'
                            id='password'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <div className={ classes.submitButton }>
                        <Button type='submit' id='submit' variant='contained' color='primary'>
                            login
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}