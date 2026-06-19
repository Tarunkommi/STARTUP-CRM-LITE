import { useState } from 'react';

/**
 * A custom hook that works like useState but persists the state in localStorage.
 * Handles JSON parsing errors gracefully and falls back to the initial value.
 *
 * @template T
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T} initialValue - The initial value to use if no value is found or an error occurs.
 * @returns {[T, Function]} An array containing the stored value and a function to update it.
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Return initialValue if window is undefined (e.g., SSR environments)
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      // Get the value from localStorage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error (e.g., invalid JSON), log warning and return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Handle edge cases like QuotaExceededError or private browsing restrictions
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
