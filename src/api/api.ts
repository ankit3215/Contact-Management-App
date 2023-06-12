// src/api/api.ts
import { useQuery } from 'react-query';

const BASE_URL = 'https://disease.sh/v3/covid-19';

export const fetchWorldwideData = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch worldwide data');
  }
  return response.json();
};

export const fetchCountryData = async () => {
  const response = await fetch(`${BASE_URL}/countries`);
  if (!response.ok) {
    throw new Error('Failed to fetch country data');
  }
  return response.json();
};

export const fetchHistoricalData = async () => {
  const response = await fetch(`${BASE_URL}/historical/all?lastdays=all`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical data');
  }
  return response.json();
};

export const useWorldwideData = () => {
  return useQuery('worldwideData', fetchWorldwideData);
};

export const useCountryData = () => {
  return useQuery('countryData', fetchCountryData);
};

export const useHistoricalData = () => {
  return useQuery('historicalData', fetchHistoricalData);
};
