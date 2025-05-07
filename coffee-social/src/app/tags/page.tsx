import { mockTags, mockRestaurants } from '../../data/mockData';
import Link from 'next/link';

export const metadata = {
  title: 'Tags | Caffeine Compass',
  description: 'Browse coffee shops by tag',
};

export default function TagsPage() {
  // Calculate how many restaurants have each tag
  const tagCounts = mockTags.map(tag => {
    const count = mockRestaurants.filter(restaurant => 
      restaurant.tags.some(t => t.id === tag.id)
    ).length;
    
    return {
      ...tag,
      count
    };
  });

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse by Tag</h1>
        <p className="text-gray-600">Find coffee shops by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tagCounts.map((tag) => (
          <div 
            key={tag.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-5 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-amber-800 mb-2">{tag.name}</h2>
              <p className="text-gray-600 mb-4">{tag.count} {tag.count === 1 ? 'shop' : 'shops'}</p>
              <Link 
                href={`/tags/${tag.id}`}
                className="mt-2 text-amber-700 hover:text-amber-900 font-medium"
              >
                View Shops →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}