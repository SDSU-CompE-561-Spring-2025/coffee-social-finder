'use client'

import { useState, useEffect } from 'react'
import { mockRestaurants } from '@/data/mockData'
import Link from 'next/link'
import Image from 'next/image'

export default function MapPage() {
  // Mock coordinates for the coffee shops
  // In a real app, these would come from your backend or an API
  const shopCoordinates = [
    { id: 1, lat: 32.748, lng: -117.130 }, // Holsem
    { id: 2, lat: 32.763, lng: -117.121 }, // LeStats
    { id: 3, lat: 32.788, lng: -117.097 }, // S3Coffee
    { id: 4, lat: 32.759, lng: -117.070 }, // Living Room
    { id: 5, lat: 32.758, lng: -117.078 }, // ATea7
    { id: 6, lat: 32.758, lng: -117.075 }, // North Park area
  ]

  // Combine restaurant data with coordinates
  const coffeeShops = mockRestaurants.map((restaurant, index) => {
    const coordinates = shopCoordinates.find(coord => coord.id === restaurant.id)
    return {
      ...restaurant,
      lat: coordinates?.lat || 32.715 + (index * 0.01), // Fallback with slight offset
      lng: coordinates?.lng || -117.161 + (index * 0.01)
    }
  })

  // Function to create Google Maps URL for a location
  const getGoogleMapsEmbedUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=15`
  }

  // Function to create Google Maps directions URL
  const getGoogleMapsDirectionsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  }

  // Track selected coffee shop for the focused map view
  const [selectedShop, setSelectedShop] = useState(coffeeShops[0])

  return (
    <div className="min-h-screen bg-[#F8F5F2] p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#5D6748]">Coffee Shops Map</h1>
      
      <div className="mb-6">
        <p className="text-gray-700">Find coffee shops near you on the map below. Click on a shop to view its location.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - List of coffee shops */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-[#5D6748] mb-2">Coffee Shops</h2>
          
          {coffeeShops.map((shop) => (
            <div 
              key={shop.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer text-black ${selectedShop.id === shop.id ? 'ring-2 ring-amber-500' : ''}`}
              onClick={() => setSelectedShop(shop)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{shop.name}</h3>
                  <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                    ★ {shop.rating}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{shop.address}</p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {shop.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag.id} 
                      className="bg-amber-50 text-amber-800 px-2 py-1 rounded-full text-xs"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2 mt-2">
                  <Link 
                    href={`/restaurant/info?id=${shop.id}`}
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <span className="text-gray-300">|</span>
                  <a 
                    href={getGoogleMapsDirectionsUrl(shop.lat, shop.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right side - Map view */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-[#5D6748] mb-4">
              {selectedShop.name} - Map View
            </h2>
            
            <div className="aspect-w-16 aspect-h-9 w-full h-[500px] rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={getGoogleMapsEmbedUrl(selectedShop.lat, selectedShop.lng)}
              ></iframe>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold">{selectedShop.name}</h3>
              <p className="text-gray-600">{selectedShop.address}</p>
              <p className="text-gray-600">Phone: {selectedShop.phoneNumber}</p>
              
              <div className="mt-4">
                <a 
                  href={getGoogleMapsDirectionsUrl(selectedShop.lat, selectedShop.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
                >
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}