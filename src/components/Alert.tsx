import React, { useEffect } from 'react';
import { AiOutlineWarning, AiOutlineClose } from 'react-icons/ai';

interface AlertProps {
    message: string;
    type?: 'error' | 'warning' | 'info';
    onClose: () => void;
    autoClose?: boolean;
    autoCloseTime?: number;
}

const Alert: React.FC<AlertProps> = ({
    message,
    type = 'error',
    onClose,
    autoClose = true,
    autoCloseTime = 5000,
}) => {
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(onClose, autoCloseTime);
            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseTime, onClose]);

    const bgColor = type === 'error' ? 'bg-red-100' : type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100';
    const textColor = type === 'error' ? 'text-red-700' : type === 'warning' ? 'text-yellow-700' : 'text-blue-700';
    const borderColor = type === 'error' ? 'border-red-400' : type === 'warning' ? 'border-yellow-400' : 'border-blue-400';

    return (
        <div className={`fixed top-4 right-4 ${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded shadow-md z-50`} role="alert">
            <div className="flex items-center">
                <AiOutlineWarning className="size-5 mr-2" />
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className={`ml-2 ${textColor} hover:${textColor}`}
                    aria-label="Close alert"
                >
                    <AiOutlineClose className='size-4' />
                </button>
            </div>
        </div>
    );
};

export default Alert;
