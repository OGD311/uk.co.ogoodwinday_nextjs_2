"use client"
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function DarkLightToggle(){
    useEffect(() => {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(isDark);
    }, []);
    
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <button 
        onClick={() => { setDarkMode(!darkMode); }}
        className="cursor-pointer border z-50 fixed top-3 right-8 bg-hover p-2 rounded-full">
            <IoSunny className={`w-8 h-8 ${darkMode ? '' : 'hidden'}`} />
            <IoMoon className={`w-8 h-8 ${darkMode ? 'hidden' : ''}`} />
        </button>
    )
}