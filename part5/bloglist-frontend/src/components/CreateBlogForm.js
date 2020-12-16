import React, { useState } from 'react';

export default function CreateBlogForm({ addBlog }) {
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
                <div>
                title:
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                author:
                    <input
                        type='text'
                        name='author'
                        id='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                url:
                    <input
                        type='text'
                        name='url'
                        id='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type='submit' id='createButton'>create</button>
            </form>
        </div>
    );
}