import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

export default function BlogContent({
    user, setUser, displaySuccessMessage, displayErrorMessage
}) {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        );
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem('auth');
        setUser(null);
        displaySuccessMessage('Logged out!');
    };

    const handleAdd = async event => {
        event.preventDefault();
    
        try {
          const blog = await blogService.create({
            title, author, url
          });
          setBlogs(blogs.concat(blog));
          setTitle('');
          setAuthor('');
          setUrl('');
          displaySuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
        } catch (error) {
          displayErrorMessage(error.response.data.error);
        }
      };

    return (
    <div>
        <h2>blogs</h2>
        { user &&
        <p>
            {user.name} logged in <button onClick={ handleLogout }>logout</button>
        </p>
        }
        <div id='create-blog-form'>
            <h2>create new</h2>
            <form onSubmit={ handleAdd }>
            <div>
                title:
                <input
                type='text'
                name='title'
                value={title}
                onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
                author:
                <input
                type='text'
                name='author'
                value={author}
                onChange={({target}) => setAuthor(target.value)} />
            </div>
            <div>
                url:
                <input
                type='text'
                name='url'
                value={url}
                onChange={({target}) => setUrl(target.value)} />
            </div>
            <button type='submit'>create</button>
            </form>
        </div>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
    );
};