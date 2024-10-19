import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    onClick: () => void;
    className?: string;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, text }) => {
    const buttonClasses = classNames(
        'bg-blue-500',
        'text-white',
        'px-3',
        'py-1',
        'rounded',
        'transition duration-300 ease-in-out',
        'hover:bg-blue-600',
        'active:bg-blue-700',
        className
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
