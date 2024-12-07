import { useCallback, useState } from 'react';

const useSearchDeputes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const execute = async (search) => {
    if (search.length < 2) {
      setData([]);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/deputes?search=${encodeURIComponent(search)}`);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      // log to external application monitoring service ?
      console.error('Error fetching suggestions:', error);
      setData([]);
    }
  }

  const resetData = useCallback(() => {
    setData([]);
  }, []);

  return {
    isLoading,
    data,
    execute: useCallback(execute, []),
    resetData,
  };
}

export { useSearchDeputes };