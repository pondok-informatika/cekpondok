import { useState, useEffect } from 'react';

export default function useApi<T>(baseUrl: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const executeFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = baseUrl.startsWith('http') || baseUrl.startsWith('/api') ? baseUrl : `/api${baseUrl}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeFetch();
  }, [baseUrl]);

  const refetch = () => {
    executeFetch();
  };

  return { data, loading, error, refetch };
}