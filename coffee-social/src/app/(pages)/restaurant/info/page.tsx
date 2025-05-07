import Image from "next/image"
import Link from "next/link"

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-[#e8dbb7]">

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold text-[#5E6747]">Mandarin Beijing</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Restaurant Image */}
          <div className="overflow-hidden rounded-lg border-4 border-[#3a3a2e]">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Restaurant Interior"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Restaurant Info */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-[#5E6747]">User Rating:</h2>
              <div className="mt-2 flex">
                {/* Simple star rating using text characters instead of Lucide icons */}
                <div className="flex">
                  <span className="text-2xl">5 Stars</span>
                  
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#5E6747]">About the Restaurant:</h2>
              <p className="mt-2 text-[#4B3621]">
                Mandarin Beijing offers the most authentic and fresh Chinese food than anyone can offer, we care about
                our customers and we love their feedback. We truly believe good food can change a person's bad day into
                a great day. Give us a chance to satisfy your cravings.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-[#5E6747]">Related Reviews:</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((review) => (
              <div key={review} className="rounded-lg bg-white p-4 shadow-md">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <h3 className="font-semibold">Title</h3>
                    <p className="text-sm text-gray-500">Description</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  The food was amazing! I especially loved the Peking duck and the service was excellent.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-[#5E6747]">Related Tags:</h2>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#3a3a2e] px-3 py-1 text-sm text-white">Tag</span>
            <span className="rounded-full bg-[#3a3a2e] px-3 py-1 text-sm text-white">Tag</span>
            <span className="rounded-full bg-[#3a3a2e] px-3 py-1 text-sm text-white">Tag</span>
          </div>
        </div>
      </main>
    </div>
  )
}
