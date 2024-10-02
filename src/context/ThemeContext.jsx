// src/context/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightModeBackgroundColor = '#5B99C2'; // Light mode background color
  const darkModeBackgroundColor = '#343a40'; // Example dark mode background color (you can customize this)

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        backgroundColor: isDarkMode ? darkModeBackgroundColor : lightModeBackgroundColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
