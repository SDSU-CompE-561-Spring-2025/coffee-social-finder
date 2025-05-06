import Link from 'next/link';
import { mockRestaurants, mockTags } from '../data/mockData';

export default function Home() {
  // Get 3 featured restaurants
  const featuredRestaurants = mockRestaurants.slice(0, 3);
  
  // Get 6 featured tags
  const featuredTags = mockTags.slice(0, 6);

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-900">Caffeine Compass</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the perfect coffee spot for your mood, work, or social gathering.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/restaurants" 
            className="bg-amber-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Browse Coffee Shops
          </Link>
          <Link 
            href="/tags" 
            className="bg-white border border-amber-800 text-amber-800 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors"
          >
            Browse by Tag
          </Link>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">Featured Coffee Shops</h2>
          <Link href="/restaurants" className="text-amber-700 hover:text-amber-900 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-amber-500 mr-1">★</span>
                  <span>{restaurant.rating}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{restaurant.address}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag.id} 
                      className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/restaurants/${restaurant.id}`}
                  className="text-amber-700 hover:text-amber-900 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tags Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">Popular Tags</h2>
          <Link href="/tags" className="text-amber-700 hover:text-amber-900 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredTags.map((tag) => (
            <Link 
              key={tag.id} 
              href={`/tags/${tag.id}`}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-amber-800 font-medium">{tag.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}