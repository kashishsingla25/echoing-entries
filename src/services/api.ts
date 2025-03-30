
/**
 * API service for fetching country data from the RestCountries API.
 * Used as the data source for our blog system.
 */

// Base URL for the RestCountries API
const BASE_URL = "https://restcountries.com/v3.1";

// Interface for Country data
export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string; // Country code (used as ID)
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: Record<string, string>;
  borders?: string[];
  area: number;
  maps: {
    googleMaps: string;
  };
  timezones: string[];
  continents: string[];
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  startOfWeek: string;
  capitalInfo?: {
    latlng?: number[];
  };
  likes?: number; // Custom property for our blog
}

/**
 * Fetch all countries
 */
export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error(`Error fetching countries: ${response.statusText}`);
    }
    const data: Country[] = await response.json();
    
    // Add likes property to each country (simulating blog post likes)
    return data.map(country => ({
      ...country,
      likes: Math.floor(Math.random() * 100) // Random likes count for demo
    }));
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw error;
  }
};

/**
 * Fetch a single country by code
 */
export const getCountryByCode = async (code: string): Promise<Country> => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) {
      throw new Error(`Error fetching country: ${response.statusText}`);
    }
    const data: Country[] = await response.json();
    
    // Add likes property
    return {
      ...data[0],
      likes: Math.floor(Math.random() * 100) // Random likes count for demo
    };
  } catch (error) {
    console.error(`Failed to fetch country with code ${code}:`, error);
    throw error;
  }
};

/**
 * Search countries by name
 */
export const searchCountries = async (query: string): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/name/${query}`);
    if (!response.ok) {
      if (response.status === 404) {
        return []; // No matches found
      }
      throw new Error(`Error searching countries: ${response.statusText}`);
    }
    const data: Country[] = await response.json();
    
    // Add likes property to each country
    return data.map(country => ({
      ...country,
      likes: Math.floor(Math.random() * 100) // Random likes count for demo
    }));
  } catch (error) {
    console.error("Failed to search countries:", error);
    // Return empty array instead of throwing to handle gracefully
    return [];
  }
};

/**
 * Filter countries by region
 */
export const filterCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) {
      throw new Error(`Error filtering countries: ${response.statusText}`);
    }
    const data: Country[] = await response.json();
    
    // Add likes property to each country
    return data.map(country => ({
      ...country,
      likes: Math.floor(Math.random() * 100) // Random likes count for demo
    }));
  } catch (error) {
    console.error("Failed to filter countries:", error);
    throw error;
  }
};
