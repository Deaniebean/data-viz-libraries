import { useState, useEffect } from "react";
import "./styles/themeToggle.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, check the user's previous theme preference from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle the theme and save the preference to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  // Set the data-theme attribute on the body tag
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  return (
    <div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="themeToggle"
      >
        {isDarkMode ? (
          <FontAwesomeIcon icon={faSun} className="sunIcon" />
        ) : (
          <FontAwesomeIcon icon={faMoon} className="moonIcon" />
        )}
      </button>
    </div>
  );
};
