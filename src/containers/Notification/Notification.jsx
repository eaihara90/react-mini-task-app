import React from 'react';
import './Notification.scss';

export const Notification = (props) => {
    return (
        <>
            <div className="Notification">
                <p className="Notification__Message">{ props.message }</p>
            </div>
        </>
    )
}
