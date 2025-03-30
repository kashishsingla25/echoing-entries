
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-gray-900">GlobalBlog</h3>
            <p className="text-gray-600 mt-1">Discover the world through our blog posts.</p>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="text-gray-600">using Rest Countries API</span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} GlobalBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
