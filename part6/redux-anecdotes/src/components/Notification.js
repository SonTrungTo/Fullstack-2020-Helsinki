import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification.message);
    const isDisplay = useSelector(state => state.notification.display);
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    };
    const noStyle = {
        display: 'none'
    };
    return (
        <div style={ isDisplay ? style : noStyle }>
            { notification }
        </div>
    );
};

export default Notification;