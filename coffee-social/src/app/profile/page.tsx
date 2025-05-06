import Image from "next/image"
import { Clock } from 'lucide';

export default function Home() {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-4">
      {/* Left Column - Profile Section */}
      <div className="md:col-span-1 space-y-4">
        <div className="bg-[#e8d7f7] p-6 rounded-full w-64 h-64 mx-auto flex items-center justify-center">
          <div className="relative">
            <Image src="/coffee-illustration.svg" alt="Coffee Illustration" width={150} height={150} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center mb-2 text-black">"Quote"</h2>
          <div className="flex items-center mt-2">
            <Image src="/avatar.png" alt="User Avatar" width={40} height={40} className="rounded-full mr-2" />
            <div>
              <p className="font-semibold text-black">Title</p>
              <p className="text-gray-600 text-sm">Description</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Clock className="mx-auto mb-2 text-black" size={24} />
            <p className="text-2xl font-bold text-black">100</p>
            <p className="text-sm text-black">Cups of Coffee taken</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Clock className="mx-auto mb-2 text-black" size={24} />
            <p className="text-2xl font-bold text-black">100</p>
            <p className="text-sm text-black">Upvotes</p>
          </div>
        </div>
      </div>

      {/* Right Column - Reviews and Activity */}
      <div className="md:col-span-2 space-y-6">
        {/* Top Reviews Section */}
        <div>
          <div className="bg-[#5e3c1e] text-black p-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">Top Reviews:</h2>
          </div>
          <div className="bg-[#9a7b53] p-4 rounded-b-lg">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Review Card 1 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-black">Review title</h3>
                <p className="text-gray-600 mb-4">Review body</p>
                <div className="flex items-center">
                  <Image src="/avatar.png" alt="Reviewer Avatar" width={40} height={40} className="rounded-full mr-2" />
                  <div>
                    <p className="font-semibold text-black">Reviewer name</p>
                    <p className="text-gray-600 text-sm">Date</p>
                  </div>
                </div>
              </div>

              {/* Review Card 2 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-black">Review title</h3>
                <p className="text-gray-600 mb-4">Review body</p>
                <div className="flex items-center">
                  <Image src="/avatar.png" alt="Reviewer Avatar" width={40} height={40} className="rounded-full mr-2" />
                  <div>
                    <p className="font-semibold text-black">Reviewer name</p>
                    <p className="text-gray-600 text-sm">Date</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <div className="bg-[#5e3c1e] text-black p-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">Recent Activity:</h2>
          </div>
          <div className="bg-[#9a7b53] p-4 rounded-b-lg">
            <div className="space-y-4">
              {/* Activity Card 1 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-gray-200 w-24 h-24"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black">Title</h3>
                    <p className="text-gray-600 mb-4">
                      Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a
                      very very short story.
                    </p>
                    <button className="bg-gray-200 px-4 py-1 rounded-md text-black">Button</button>
                  </div>
                </div>
              </div>

              {/* Activity Card 2 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-gray-200 w-24 h-24"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black">Title</h3>
                    <p className="text-gray-600 mb-4">
                      Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a
                      very very short story.
                    </p>
                    <button className="bg-gray-200 px-4 py-1 rounded-md text-black">Button</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}