import React from 'react';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});

const Blogs = ({ blogs, createNewBlog, createBlogFormRef }) => {
    const classes = useStyles();

    if (!blogs) {
        return null;
    }

    return (
        <div>
            <Togglable labelButton='create new' ref={createBlogFormRef}>
                <CreateBlogForm addBlog={createNewBlog} />
            </Togglable>
            <TableContainer component={ Paper }>
                <Table className={ classes.table }>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align='right'>Author</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { blogs.map(blog =>
                            <StyledTableRow key={blog.id} id='blogContent'>
                                <StyledTableCell>
                                    <Button component={ Link } to={`/blogs/${blog.id}`}>
                                        { blog.title }
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    { blog.author }
                                </StyledTableCell>
                            </StyledTableRow>
                        ) }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Blogs;