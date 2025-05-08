'use client'

import { useState, useEffect } from 'react';
import { mockRestaurants, mockTags } from '@/data/mockData';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<number | null>(null);
  const [tagName, setTagName] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'name', 'rating'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc', 'desc'

  // Apply filters and sorting
  useEffect(() => {
    // only use search from url params - only fallback to localStorage when explicitly searching
    const urlSearch = searchParams?.get('search') || '';
    const storedSearch = typeof window !== 'undefined' ? localStorage.getItem('lastSearchQuery') || '' : '';
    
    // Check for tag filter in URL
    const tagParam = searchParams?.get('tag');
    const tagId = tagParam ? parseInt(tagParam) : null;
    
    // only use localStorage as fallback when coming from search
    const query = urlSearch || (urlSearch === '' && !tagParam ? storedSearch : '');
    setSearchQuery(query);
    setTagFilter(tagId);
    
    // Get tag name if filtering by tag
    if (tagId) {
      const tag = mockTags.find(t => t.id === tagId);
      setTagName(tag ? tag.name : '');
    } else {
      setTagName('');
    }
    
    // Apply filters
    let filtered = [...mockRestaurants];
    
    // Filter by search query if present
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(restaurant => (
        restaurant.name.toLowerCase().includes(searchLower) || 
        restaurant.address.toLowerCase().includes(searchLower) ||
        restaurant.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
      ));
    }
    
    // Filter by tag if present
    if (tagId) {
      filtered = filtered.filter(restaurant => 
        restaurant.tags.some(tag => tag.id === tagId)
      );
    }
    
    // Apply sorting
    if (sortBy === 'name') {
      filtered.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => {
        const comparison = a.rating - b.rating;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    setFilteredRestaurants(filtered);
  }, [searchParams, sortBy, sortDirection]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="py-8 px-6 md:px-12 lg:px-16 bg-[#dddfcb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[#5D6748] font-serif text-center">Coffee Shops</h1>
          <p className="text-gray-600 text-lg text-center">Discover the best coffee shops in your area</p>
        </div>

        {/* Search bar at the top of results page */}
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {/* Filtering and sorting controls */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            {searchQuery && (
              <div className="mb-2">
                <div className="flex items-center">
                  <h2 className="text-xl">
                    Search results for: <span className="font-semibold">{searchQuery}</span>
                  </h2>
                  <button 
                    className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-full text-sm"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('lastSearchQuery');
                        window.location.href = '/restaurant';
                      }
                    }}
                  >
                    Clear
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Found {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'shop' : 'shops'}
                </p>
              </div>
            )}
            
            {tagFilter && (
              <div className="mb-2">
                <h2 className="text-xl">
                  Browsing tag: <span className="font-semibold">{tagName}</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Found {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'shop' : 'shops'}
                </p>
              </div>
            )}
            
            {!searchQuery && !tagFilter && (
              <h2 className="text-xl font-medium text-gray-700">
                All Coffee Shops <span className="text-gray-500">({filteredRestaurants.length})</span>
              </h2>
            )}
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="flex items-center space-x-3">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="text-gray-700 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              >
                <option value="default">Default</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
              
              <button
                onClick={toggleSortDirection}
                className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                aria-label={sortDirection === 'asc' ? "Sort ascending" : "Sort descending"}
              >
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-700">No coffee shops found matching your criteria.</p>
            <p className="text-gray-600 mt-2">Try a different search term or browse all shops.</p>
            <Link 
              href="/restaurant"
              className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              View All Shops
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 bg-gray-200 relative">
              <Image
                src={restaurant.image[0]}
                alt={restaurant.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-black">{restaurant.name}</h2>
                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                  ★ {restaurant.rating}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{restaurant.address}</p>
              
              <div className="mb-4">
                <p className="text-gray-700 font-medium">
                  <span className="font-semibold">Phone:</span> {restaurant.phoneNumber}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag) => (
                  <span 
                    key={tag.id} 
                    className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link 
                  href={`/restaurant/info?id=${restaurant.id}`}
                  className="text-amber-700 hover:text-amber-900 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
      </div>
    </div>
  );
}