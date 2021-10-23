import useSWR, { SWRResponse } from 'swr';
import axios, { AxiosError } from 'axios';

// use mock data
// import initializeAxiosMockAdapter from '../__mockApi__/mockApi';

// initializeAxiosMockAdapter(axios);

export const fetcher = <T>(url: string): Promise<T> => (
  axios
    .get<T>(url)
    .then((response) => response.data)
);

const useGet = <T>(
  url: string | null,
  onSuccess: (data: T) => void = (data: T) => data,
  dedupingInterval = 3600000, // default 1 hour cache refreshes
): SWRResponse<T, AxiosError | Error> => {
  return useSWR<T, AxiosError | Error>(
    url,
    url ? (key: string) => fetcher<T>(key): null,
    {
      onSuccess,
      dedupingInterval,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  );
};

export default useGet;