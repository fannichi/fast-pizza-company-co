// contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Define theme colors
const themeColors = {
  yellow: '#FFD700', // yellow hex code
  slate: '#64748b', // same as before
  red: '#fb7185', // red hex code
  green: '#86efac', // green hex code
  pink: '#f9a8d4', // pink hex code
  purple: '#9370DB', // purple hex code
  orange: '#FFA500', // orange hex code
  emerald: '#d8b4fe', // emerald hex code
  zinc: '#0369a1', // zinc hex code
};

// Provider component to wrap the app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('yellow'); // Default theme

  // Whenever theme changes, update the CSS variable in the root document
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', themeColors[theme]);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
