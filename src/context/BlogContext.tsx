
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Country, getAllCountries, searchCountries, filterCountriesByRegion } from '../services/api';
import { useToast } from '@/hooks/use-toast';

interface BlogContextProps {
  countries: Country[];
  loading: boolean;
  error: string | null;
  likedCountries: Set<string>;
  searchQuery: string;
  selectedRegion: string;
  filteredCountries: Country[];
  toggleLike: (countryCode: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedRegion: (region: string) => void;
  refreshCountries: () => Promise<void>;
}

// Create context with default values
const BlogContext = createContext<BlogContextProps>({
  countries: [],
  loading: false,
  error: null,
  likedCountries: new Set(),
  searchQuery: '',
  selectedRegion: '',
  filteredCountries: [],
  toggleLike: () => {},
  setSearchQuery: () => {},
  setSelectedRegion: () => {},
  refreshCountries: async () => {},
});

// Custom hook to use the blog context
export const useBlog = () => useContext(BlogContext);

interface BlogProviderProps {
  children: ReactNode;
}

// Provider component
export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedCountries, setLikedCountries] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const { toast } = useToast();

  // Fetch countries on initial load
  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCountries();
      setCountries(data);
      // Initially, filtered countries is the same as all countries
      setFilteredCountries(data);
    } catch (err) {
      setError('Failed to fetch countries. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to fetch countries. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh countries (exposed for potential use)
  const refreshCountries = async () => {
    await fetchCountries();
  };

  // Initial fetch
  useEffect(() => {
    fetchCountries();
    // Try to load liked countries from localStorage
    const savedLikes = localStorage.getItem('likedCountries');
    if (savedLikes) {
      try {
        setLikedCountries(new Set(JSON.parse(savedLikes)));
      } catch (e) {
        console.error('Failed to load saved likes', e);
      }
    }
  }, []);

  // Toggle like status for a country
  const toggleLike = (countryCode: string) => {
    setLikedCountries(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(countryCode)) {
        newLikes.delete(countryCode);
        toast({
          title: 'Removed from favorites',
          description: 'This country has been removed from your liked posts.',
        });
      } else {
        newLikes.add(countryCode);
        toast({
          title: 'Added to favorites',
          description: 'This country has been added to your liked posts.',
        });
      }
      
      // Save to localStorage
      localStorage.setItem('likedCountries', JSON.stringify([...newLikes]));
      return newLikes;
    });
  };

  // Effect to handle filtering based on search query and region
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        let filtered = [...countries];
        
        // If there's a search query, use it
        if (searchQuery.trim()) {
          filtered = await searchCountries(searchQuery);
        } 
        // If region is selected and no search query, filter by region
        else if (selectedRegion && !searchQuery.trim()) {
          filtered = await filterCountriesByRegion(selectedRegion);
        }
        // If both search and region are active, further filter the search results by region
        if (selectedRegion && searchQuery.trim()) {
          filtered = filtered.filter(country => country.region.toLowerCase() === selectedRegion.toLowerCase());
        }
        
        setFilteredCountries(filtered);
      } catch (err) {
        console.error('Error applying filters:', err);
        toast({
          title: 'Error',
          description: 'There was an issue with your search. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    // Debounce the filter application
    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedRegion, countries]);

  return (
    <BlogContext.Provider 
      value={{
        countries,
        loading,
        error,
        likedCountries,
        searchQuery,
        selectedRegion,
        filteredCountries,
        toggleLike,
        setSearchQuery,
        setSelectedRegion,
        refreshCountries
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
