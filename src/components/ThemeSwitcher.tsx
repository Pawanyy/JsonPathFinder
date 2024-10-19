import React, { useEffect } from 'react';
import { HiSun, HiMoon } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleTheme } from '../redux/themeSlice';

const ThemeSwitcher: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <button type="button" className="theme-switcher"
            onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? (<HiSun />) : (<HiMoon />)}
        </button>
    );
};

export default ThemeSwitcher;