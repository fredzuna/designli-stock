import { IStockSymbol } from "../interfaces/IStockSymbol";

const apiKey = 'cq7k9ihr01qormuik3m0cq7k9ihr01qormuik3mg';
const baseUrl = 'https://finnhub.io/api/v1'

// Create a generic fetch function
const fetchFromApi = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

// Specific function to fetch stock symbols
export const fetchStockSymbols = async (): Promise<IStockSymbol[]> => {
  const url = `${baseUrl}/stock/symbol?token=${apiKey}&exchange=US&mic=XASE`;
  return fetchFromApi<IStockSymbol[]>(url);
};
