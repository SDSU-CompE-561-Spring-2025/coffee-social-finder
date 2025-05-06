import { mockRestaurants } from '../../data/mockData';
import Link from 'next/link';

export const metadata = {
  title: 'Restaurants | Caffeine Compass',
  description: 'Find your perfect coffee spot',
};

export default function RestaurantsPage() {
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coffee Shops</h1>
        <p className="text-gray-600">Discover the best coffee shops in your area</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRestaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">{restaurant.name}</h2>
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
                  href={`/restaurants/${restaurant.id}`}
                  className="text-amber-700 hover:text-amber-900 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}