import React, { useEffect, useState } from 'react';
import { HiSun, HiMoon } from "react-icons/hi2";

const ThemeSwitcher: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <button type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (<HiSun className='size-5' />) : (<HiMoon className='size-5' />)}
        </button>
    );
};

export default ThemeSwitcher;
