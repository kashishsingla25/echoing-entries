import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Country, getCountryByCode } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeartIcon, Globe, Users, MapPin, Languages, Landmark, CalendarDays, Waves } from 'lucide-react';
import { useBlog } from '@/context/BlogContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/formatters';
import { toast } from 'sonner';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { likedCountries, toggleLike } = useBlog();
  
  useEffect(() => {
    const fetchCountry = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getCountryByCode(id);
        if (!data) {
          throw new Error(`Country with code "${id}" not found`);
        }
        setCountry(data);
      } catch (err) {
        console.error('Error fetching country details:', err);
        setError('Country not found. The country code may be invalid.');
        toast.error('Country not found. Redirecting to home page...');
        
        // After 3 seconds, redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountry();
  }, [id, navigate]);
  
  const isLiked = id ? likedCountries.has(id) : false;
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container-custom py-12">
          <Button onClick={handleGoBack} variant="outline" className="mb-8">
            &larr; Back
          </Button>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Skeleton className="h-72 w-full" />
            <div className="p-8">
              <Skeleton className="h-12 w-3/4 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                </div>
                <div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                </div>
              </div>
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container-custom py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {error}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the country you're looking for. You'll be redirected to the home page.
          </p>
          <Button onClick={handleGoBack}>
            Go Back
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container-custom py-12">
        <Button onClick={handleGoBack} variant="outline" className="mb-8">
          &larr; Back
        </Button>
        
        {country ? (
          <article className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative h-72">
              <img
                src={country.flags.png}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="flex items-center mb-2 text-white/80">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>{country.region} {country.subregion ? `• ${country.subregion}` : ''}</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-1">{country.name.common}</h1>
                <p className="text-white/90 text-lg italic">{country.name.official}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleLike(country.cca3)}
                    className="flex items-center space-x-2"
                  >
                    <HeartIcon 
                      className={cn(
                        "h-6 w-6 transition-colors", 
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"
                      )} 
                    />
                    <span className={cn(
                      "font-medium",
                      isLiked ? "text-red-500" : "text-gray-500"
                    )}>
                      {(country.likes || 0) + (isLiked ? 1 : 0)} likes
                    </span>
                  </button>
                </div>
                
                {country.maps.googleMaps && (
                  <a 
                    href={country.maps.googleMaps} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View on Map
                  </a>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Country Info</h2>
                  
                  <div className="space-y-3">
                    {country.capital && (
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                        <div>
                          <p className="text-gray-700 font-medium">Capital</p>
                          <p className="text-gray-900">{country.capital.join(', ')}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-gray-700 font-medium">Population</p>
                        <p className="text-gray-900">{formatNumber(country.population)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Waves className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-gray-700 font-medium">Area</p>
                        <p className="text-gray-900">{formatNumber(country.area)} km²</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Additional Details</h2>
                  
                  <div className="space-y-3">
                    {country.languages && Object.keys(country.languages).length > 0 && (
                      <div className="flex items-start">
                        <Languages className="h-5 w-5 mr-3 text-blue-600 mt-1" />
                        <div>
                          <p className="text-gray-700 font-medium">Languages</p>
                          <p className="text-gray-900">
                            {Object.values(country.languages).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 mr-3 text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-700 font-medium">Timezones</p>
                        <p className="text-gray-900 max-h-20 overflow-y-auto">
                          {country.timezones.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Landmark className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-gray-700 font-medium">Start of Week</p>
                        <p className="text-gray-900 capitalize">{country.startOfWeek}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {country.borders && country.borders.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Neighboring Countries</h3>
                  <div className="flex flex-wrap gap-2">
                    {country.borders.map(border => (
                      <button
                        key={border}
                        onClick={() => navigate(`/blog/${border}`)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {border}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
