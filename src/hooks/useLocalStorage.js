import { useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (!savedData) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }, [key, defaultValue]);

  const getData = () => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  };

  const setData = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [getData, setData];
};
