import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-6">About Caffeine Compass</h1>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <div className="w-48 h-48 relative flex-shrink-0">
                <Image
                  src="/assets/coffeecompass.svg"
                  alt="Caffeine Compass Logo"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
              
              <div>
                <p className="text-gray-700 mb-4">
                  caffeine compass helps coffee enthusiasts discover the perfect cup in their area. our mission is to connect people with local coffee shops that match their preferences.
                </p>
                
                <p className="text-gray-700 mb-4">
                  founded in 2023, we've grown to feature hundreds of coffee shops across the country, with detailed information, ratings, and reviews from our community.
                </p>
                
                <p className="text-gray-700">
                  whether you're looking for a cozy spot to read, a quiet place to work, or simply the best espresso in town, caffeine compass helps you find your way.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Our Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-bold text-amber-900 mb-2">Search</h3>
                  <p className="text-gray-700">find coffee shops by name, location, or amenities</p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-bold text-amber-900 mb-2">Reviews</h3>
                  <p className="text-gray-700">read authentic reviews from our community of coffee lovers</p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-bold text-amber-900 mb-2">Maps</h3>
                  <p className="text-gray-700">locate coffee shops near you with our interactive map</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                have questions or suggestions? we'd love to hear from you.
              </p>
              
              <address className="not-italic text-gray-700">
                <div className="mb-2">
                  <span className="font-semibold">Email:</span> hello@caffeinecompass.com
                </div>
                <div>
                  <span className="font-semibold">Address:</span> 123 Coffee Lane, Bean City, CA 90210
                </div>
              </address>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Explore Coffee Shops
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}