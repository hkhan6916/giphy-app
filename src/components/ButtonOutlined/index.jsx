import React from 'react';
import './index.scss';

export const Button = (props) => {
    return (
        <button onClick={props.onClick} id='button-outlined'>
            {props.children}
        </button>
    );
};
