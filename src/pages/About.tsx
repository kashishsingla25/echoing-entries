
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, MapPin, Globe, Heart, Search } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-800 text-white">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About GlobalBlog
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Learn more about our mission to share knowledge about countries around the world.
            </p>
          </div>
        </section>
        
        <section className="container-custom py-16">
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              GlobalBlog was created to provide a comprehensive resource for learning about different countries and cultures around the world. 
              We believe that understanding different cultures promotes global harmony and appreciation for our diverse world.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              This project uses the <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rest Countries API</a> to 
              provide accurate and up-to-date information about countries across the globe.
            </p>
          </div>
          
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Blog Posts</h3>
              <p className="text-gray-600">
                Detailed articles about each country with comprehensive information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Search & Filter</h3>
              <p className="text-gray-600">
                Find countries by name or filter by region to discover new places.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Like System</h3>
              <p className="text-gray-600">
                Save your favorite countries to revisit them later.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Map Integration</h3>
              <p className="text-gray-600">
                View countries on interactive maps to explore geography.
              </p>
            </div>
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Join Our Global Community</h2>
            <p className="text-gray-700 text-lg mb-4">
              Explore countries, share knowledge, and expand your horizons with GlobalBlog.
            </p>
            <p className="text-gray-700">
              This project was built as a demonstration of React skills and API integration.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
