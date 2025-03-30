
import React from 'react';
import { Link } from 'react-router-dom';
import { Country } from '@/services/api';
import { HeartIcon, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlog } from '@/context/BlogContext';
import { formatNumber } from '@/lib/formatters';

interface BlogCardProps {
  country: Country;
}

const BlogCard: React.FC<BlogCardProps> = ({ country }) => {
  const { likedCountries, toggleLike } = useBlog();
  const isLiked = likedCountries.has(country.cca3);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow blog-card">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={country.flags.png} 
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-xl font-bold truncate">{country.name.common}</h2>
          <p className="text-white/80 text-sm">{country.region}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          {country.capital ? (
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Capital: {country.capital[0]}</span>
            </div>
          ) : null}
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{formatNumber(country.population)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <Link 
            to={`/blog/${country.cca3}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read more →
          </Link>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleLike(country.cca3);
            }}
            className="flex items-center space-x-1 text-sm"
          >
            <HeartIcon 
              className={cn(
                "h-5 w-5 transition-colors", 
                isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              )} 
            />
            <span className={cn(isLiked ? "text-red-500" : "text-gray-500")}>
              {(country.likes || 0) + (isLiked ? 1 : 0)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
