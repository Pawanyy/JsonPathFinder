import React from 'react';
import classNames from 'classnames';

const Button = ({ onClick, className, text }) => {
    const buttonClasses = classNames(
        'bg-blue-500',
        'text-white',
        'px-3',
        'py-1',
        'rounded',
        'transition duration-300 ease-in-out', // Smooth transition effect
        'hover:bg-blue-600', // Background color change on hover
        'active:bg-blue-700', // Background color change on click
        className // Any additional classes passed
    );

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
