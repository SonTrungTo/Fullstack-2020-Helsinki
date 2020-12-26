import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
    if (!users) {
        return null;
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td style={{ fontWeight: 'bold' }}>blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    { users.map(user =>
                        <tr key={ user.id }>
                            <td>
                                <Link to={`/users/${ user.id }`}>
                                    { user.name }
                                </Link>
                            </td>
                            <td> { user.blogs.length } </td>
                        </tr>) }
                </tbody>
            </table>
        </div>
    );
};

export default Users;