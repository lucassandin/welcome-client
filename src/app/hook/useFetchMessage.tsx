import useSWR from "swr";
import { Welcome } from "../interfaces/interfaces";
import { unstable_noStore as noStore } from 'next/cache';

export interface FetchProps {
  data: Welcome | undefined;
  error: any;
}

export function useFetchMessage(): FetchProps {
  noStore(); 
  try {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;
    const url = `${apiUrl}/welcome/random`;
  
    const { data, error } = useSWR(url, async (url) => {
      const response = await fetch(url);
      const resultSet = await response.json();
  
      const data: Welcome = resultSet;
  
      return data;
    })
  
    return { data, error };
  } catch (error) {
    throw new Error('Erro ao consultar boas vindas')
  }
}