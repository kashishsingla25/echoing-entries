
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import SearchFilter from '@/components/SearchFilter';
import { BlogProvider } from '@/context/BlogContext';

const Index = () => {
  return (
    <BlogProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-800 text-white">
            <div className="container-custom">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to GlobalBlog
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Explore fascinating articles about countries around the world. Discover cultures, landmarks, and stories from every corner of the globe.
              </p>
            </div>
          </section>
          
          <section className="container-custom py-12">
            <SearchFilter />
            <BlogList />
          </section>
        </main>
        
        <Footer />
      </div>
    </BlogProvider>
  );
};

export default Index;
