import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface UseAxiosConfig {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  auto?: boolean;
  axiosConfig?: AxiosRequestConfig;
}

export function useAxios({
  url,
  method = 'GET',
  body = null,
  headers = {},
  auto = true,
  axiosConfig = {},
}: UseAxiosConfig) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(
    async (overrideConfig: AxiosRequestConfig = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
          ...axiosConfig,
          ...overrideConfig,
        });

        setData(response.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, headers, axiosConfig]
  );

  useEffect(() => {
    if (auto) {
      fetchData();
    }
  }, [fetchData, auto]);

  return { data, loading, error, refetch: fetchData };
}
