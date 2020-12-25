import React from 'react';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';

const Blogs = ({ blogs, createNewBlog, createBlogFormRef }) => {
    if (!blogs) {
        return null;
    }

    return (
        <div>
            <Togglable labelButton='create new' ref={createBlogFormRef}>
                <CreateBlogForm addBlog={createNewBlog} />
            </Togglable>
            { blogs.map(blog =>
                <div key={blog.id} id='blogContent'>
                    <Link to={`/blogs/${blog.id}`}>
                        { blog.title } { blog.author }
                    </Link>
                </div>
            ) }
        </div>
    );
};

export default Blogs;