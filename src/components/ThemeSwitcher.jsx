import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <button className='text-black dark:text-white' onClick={() => setDarkMode(!darkMode)}>
            Theme
        </button>
    );
};

export default ThemeSwitcher;
