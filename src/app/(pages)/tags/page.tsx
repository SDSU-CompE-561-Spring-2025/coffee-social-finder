'use client'

import { useState, useEffect } from 'react';
//import { mockTags, mockRestaurants } from '@/data/mockData';
import Link from 'next/link';

// Define the tag interface
interface Tag {
  id: number;
  name: string;
  description: string;
}

// Define the tag with count interface
interface TagWithCount extends Tag {
  count: number;
}

// Additional coffee-related tags
const additionalTags = [
  {
    id: 11,
    name: 'Artisanal',
    description: 'Coffee shops that focus on craft and artisanal preparation methods'
  },
  {
    id: 12,
    name: 'Pet Friendly',
    description: 'Welcoming spaces that allow pets'
  },
  {
    id: 13,
    name: 'Espresso Bar',
    description: 'Specializing in expertly crafted espresso drinks'
  },
  {
    id: 14,
    name: 'Latte Art',
    description: 'Known for beautiful and intricate latte art'
  },
  {
    id: 15,
    name: 'Organic',
    description: 'Focused on serving organic, sustainably sourced coffee'
  },
  {
    id: 16,
    name: 'Cold Brew',
    description: 'Specializing in smooth, rich cold brew coffee preparations'
  }
];

  export default function TagsPage() {
    const [tagCounts, setTagCounts] = useState<TagWithCount[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
          if (!response.ok) {
            throw new Error('Failed to fetch tags');
          }
          const data: TagWithCount[] = await response.json();
          setTagCounts(data);
        } catch (error) {
          console.error('Error fetching tags:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTags();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <div className="min-h-screen bg-[#dddfcb]">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-3 text-amber-900">Browse by Tag</h1>
          <p className="text-amber-800 max-w-2xl mx-auto">
            Discover coffee shops by category and find your perfect cup based on your preferences.
            Each tag represents a unique aspect of café culture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tagCounts.map((tag) => (
            <div 
              key={tag.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="inline-block bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full mb-3">
                  Coffee Tag
                </div>
                <h2 className="text-xl font-bold text-amber-900 mb-2">{tag.name}</h2>
                <p className="text-amber-700 mb-2">{tag.count} {tag.count === 1 ? 'shop' : 'shops'}</p>
                <p className="text-gray-600 mb-4 text-sm">{tag.description}</p>
                {tag.count > 0 ? (
                  <Link 
                    href={`/restaurant?tag=${tag.id}`}
                    className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    View Shops
                  </Link>
                ) : (
                  <button 
                    disabled
                    className="mt-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    No Shops Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}