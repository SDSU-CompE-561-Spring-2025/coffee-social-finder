import ImageCarousel from "@/components/ImageCarousel";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F2]">
      {/* Hero Section */}
      <section className="relative bg-[#5D6748] text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Perfect Cup
            </h1>
            <p className="text-lg mb-6">
              Find Your Way To Your Next Cup Of Coffee With Caffeine Compass.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/map"
                className="bg-white text-[#5D6748] px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
              >
                Explore Map
              </Link>
              <Link
                href="/restaurant"
                className="border border-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-[#5D6748] transition"
              >
                Browse Cafes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cafes */}
      <section className="py-12 px-4 bg-[#D8CAA7]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-black">
            Featured Coffee Shops
          </h2>
          <ImageCarousel />
        </div>
        <div className="md:center relative py-6" >
          <SearchBar />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-[#ACA185]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#5D6748] text-[white] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">
                Find coffee shops in the San Diego.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#5D6748] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-gray-600">
                Browse ratings, reviews, and photos from other coffee lovers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#5D6748] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600">
                Visit and bookmark your favorite spots for future reference.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
