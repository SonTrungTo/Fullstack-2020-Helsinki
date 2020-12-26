import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
        textAlign: 'center'
    },
    submitButton: {
        textAlign: 'center',
        marginTop: theme.spacing(2.5)
    }
}));

export default function CreateBlogForm({ addBlog }) {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleAdd = event => {
        event.preventDefault();

        addBlog({ title, author, url });
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={ handleAdd }>
                <div className={ classes.textField }>
                    <TextField
                        type='text'
                        name='title'
                        id='title'
                        label='title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)} />
                    <br />
                    <TextField
                        type='text'
                        name='author'
                        id='author'
                        label='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                    <br />
                    <TextField
                        type='text'
                        name='url'
                        id='url'
                        label='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                    <br />
                </div>
                <div className={ classes.submitButton }>
                    <Button type='submit' id='createButton' color='primary' variant='contained'>
                        create
                    </Button>
                </div>
            </form>
        </div>
    );
}