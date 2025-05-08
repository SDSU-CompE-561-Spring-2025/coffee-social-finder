'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { mockRestaurants } from '@/data/mockData'

interface Review {
  id: number
  restaurantId: number
  userId: number
  userName: string
  rating: number
  title: string
  text: string
  date: string
}

interface User {
  id: number
  name: string
  email: string
  bio?: string
  location?: string
  favoriteShop?: string
  cupCount?: number
  profileImage?: string
  joinDate?: string
  password: string
}

export default function Profile() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    location: '',
    favoriteShop: '',
    profileImage: ''
  })
  const [cupCount, setCupCount] = useState(0)
  const [reviewSortOption, setReviewSortOption] = useState('date-desc')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [favoriteShops, setFavoriteShops] = useState(mockRestaurants)
  const [successMessage, setSuccessMessage] = useState('')

  // List of available profile images
  const availableImages = [
    '/assets/coffeecompass.svg',
    '/assets/betterbuzz.svg',
    '/assets/holsemcoffee.svg',
    '/assets/s3coffeebar.svg'
  ]

  useEffect(() => {
    // Check if a specific user is requested in the URL
    const requestedUserId = searchParams?.get('user')
    
    if (typeof window !== 'undefined') {
      // Get current logged in user
      const userJson = localStorage.getItem('currentUser')
      const loggedInUser = userJson ? JSON.parse(userJson) : null
      
      if (requestedUserId && loggedInUser?.id !== parseInt(requestedUserId)) {
        // Viewing someone else's profile
        const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const requestedUser = allUsers.find((u: User) => u.id === parseInt(requestedUserId))
        
        if (requestedUser) {
          setCurrentUser(requestedUser)
          setCupCount(requestedUser.cupCount || 0)
          setProfileData({
            name: requestedUser.name || '',
            bio: requestedUser.bio || 'No bio yet',
            location: requestedUser.location || 'No location set',
            favoriteShop: requestedUser.favoriteShop || '',
            profileImage: requestedUser.profileImage || availableImages[0]
          })
        } else {
          // User not found, redirect to restaurants
          router.push('/restaurant')
        }
      } else if (loggedInUser) {
        // Viewing own profile
        setCurrentUser(loggedInUser)
        setCupCount(loggedInUser.cupCount || 0)
        setProfileData({
          name: loggedInUser.name || '',
          bio: loggedInUser.bio || 'Tell others about yourself...',
          location: loggedInUser.location || 'Add your location',
          favoriteShop: loggedInUser.favoriteShop || '',
          profileImage: loggedInUser.profileImage || availableImages[0]
        })
      } else {
        // Not logged in, redirect to login
        router.push('/login?redirect=profile')
        return
      }
      
      // Load user reviews
      const allReviews = JSON.parse(localStorage.getItem('restaurantReviews') || '[]')
      const userId = requestedUserId ? parseInt(requestedUserId) : loggedInUser?.id
      
      if (userId) {
        const userFilteredReviews = allReviews.filter(
          (review: Review) => review.userId === userId
        )
        setUserReviews(userFilteredReviews)
      }
    }
  }, [searchParams, router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value
    })
  }

  const handleImageSelect = (imagePath: string) => {
    setProfileData({
      ...profileData,
      profileImage: imagePath
    })
    setImagePreview(imagePath)
  }

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setProfileData({
          ...profileData,
          profileImage: result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    if (!currentUser) return
    
    // Create updated user object
    const updatedUser = {
      ...currentUser,
      name: profileData.name,
      bio: profileData.bio,
      location: profileData.location,
      favoriteShop: profileData.favoriteShop,
      profileImage: profileData.profileImage,
      cupCount: cupCount
    }
    
    // Update localStorage for current user
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // Update registered users array
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const updatedUsers = registeredUsers.map((user: User) => 
      user.id === currentUser.id ? updatedUser : user
    )
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
    
    // Also update reviews with the new username
    if (profileData.name !== currentUser.name) {
      const allReviews = JSON.parse(localStorage.getItem('restaurantReviews') || '[]')
      const updatedReviews = allReviews.map((review: Review) => 
        review.userId === currentUser.id 
          ? { ...review, userName: profileData.name } 
          : review
      )
      localStorage.setItem('restaurantReviews', JSON.stringify(updatedReviews))
      setUserReviews(updatedReviews.filter((review: Review) => review.userId === currentUser.id))
    }
    
    // Update current user
    setCurrentUser(updatedUser)
    setIsEditing(false)
    
    // Show success message
    setSuccessMessage('Profile updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCupIncrement = () => {
    const newCount = cupCount + 1
    setCupCount(newCount)
    
    if (currentUser) {
      // Update cup count in current user
      const updatedUser = {
        ...currentUser,
        cupCount: newCount
      }
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      // Update registered users array
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const updatedUsers = registeredUsers.map((user: User) => 
        user.id === currentUser.id ? updatedUser : user
      )
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      
      setCurrentUser(updatedUser)
    }
  }

  const sortReviews = (reviews: Review[]) => {
    const sortedReviews = [...reviews]
    
    switch (reviewSortOption) {
      case 'date-desc':
        return sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 'date-asc':
        return sortedReviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case 'rating-desc':
        return sortedReviews.sort((a, b) => b.rating - a.rating)
      case 'rating-asc':
        return sortedReviews.sort((a, b) => a.rating - b.rating)
      default:
        return sortedReviews
    }
  }

  const getRestaurantName = (restaurantId: number) => {
    const restaurant = mockRestaurants.find(r => r.id === restaurantId)
    return restaurant ? restaurant.name : 'Unknown Coffee Shop'
  }
  
  // Check if user is viewing their own profile
  const isOwnProfile = !searchParams?.get('user') || 
    (currentUser && searchParams?.get('user') === currentUser.id.toString())

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-amber-600 to-amber-800">
            {/* Edit Button */}
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 text-amber-800 p-2 rounded-full hover:bg-opacity-100 transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
            )}
          </div>
          
          <div className="relative px-6 pt-4 pb-8">
            {/* Profile Image */}
            <div className="absolute -top-16 left-6">
              <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                {(profileData.profileImage || imagePreview) && (
                  <Image
                    src={imagePreview || profileData.profileImage}
                    alt={profileData.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
            
            <div className="ml-40">
              {isEditing ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Tell others about yourself..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Your location"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="favoriteShop" className="block text-sm font-medium text-gray-700 mb-1">
                      Favorite Coffee Shop
                    </label>
                    <select
                      id="favoriteShop"
                      name="favoriteShop"
                      value={profileData.favoriteShop}
                      onChange={handleProfileChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="">Select a favorite shop</option>
                      {favoriteShops.map(shop => (
                        <option key={shop.id} value={shop.name}>{shop.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      {availableImages.map((image, index) => (
                        <div 
                          key={index}
                          onClick={() => handleImageSelect(image)}
                          className={`relative w-20 h-20 rounded-md cursor-pointer border ${
                            profileData.profileImage === image ? 'border-amber-500 ring-2 ring-amber-500' : 'border-gray-300'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Profile image option ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center">
                      <label className="relative cursor-pointer bg-amber-100 text-amber-800 px-4 py-2 rounded-md hover:bg-amber-200 transition-colors">
                        <span>Upload Custom Image</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleCustomImageUpload}
                        />
                      </label>
                      
                      {imagePreview && (
                        <div className="ml-3 relative w-10 h-10 rounded-md overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Custom profile preview"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
                  <p className="text-gray-600 mb-3 max-w-2xl">{profileData.bio}</p>
                  
                  <div className="flex flex-wrap gap-y-2">
                    {profileData.location && (
                      <div className="flex items-center mr-6">
                        <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="text-gray-600">{profileData.location}</span>
                      </div>
                    )}
                    
                    {profileData.favoriteShop && (
                      <div className="flex items-center mr-6">
                        <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span className="text-gray-600">Favorite: {profileData.favoriteShop}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-gray-600">
                        Joined {currentUser.joinDate || 'Recently'}
                      </span>
                    </div>
                  </div>
                  
                  {successMessage && (
                    <div className="mt-3 py-2 px-3 bg-green-50 text-green-800 rounded-md">
                      {successMessage}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Coffee Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-amber-800 font-medium">Coffees Enjoyed</h3>
                  {isOwnProfile && (
                    <button
                      onClick={handleCupIncrement}
                      className="bg-amber-100 text-amber-800 p-1 rounded-full hover:bg-amber-200"
                      title="Add a cup"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold text-amber-900">{cupCount}</span>
                  <span className="ml-1 text-amber-700">cups</span>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-amber-800 font-medium mb-1">Reviews Written</h3>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold text-amber-900">{userReviews.length}</span>
                  <span className="ml-1 text-amber-700">reviews</span>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-amber-800 font-medium mb-1">Favorite Tag</h3>
                <div className="flex items-end mt-2">
                  <span className="text-lg font-medium text-amber-900">
                    {userReviews.length > 0 ? 'Cozy' : 'None yet'}
                  </span>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-amber-800 font-medium mb-1">Avg. Rating</h3>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold text-amber-900">
                    {userReviews.length > 0
                      ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1)
                      : '0.0'
                    }
                  </span>
                  <span className="ml-1 text-amber-700">/ 5</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Favorite Quote</h2>
            <div className="italic text-gray-700 border-l-4 border-amber-300 pl-4 py-2">
              <p>"Coffee is a language in itself."</p>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Recent Activity</h3>
              <div className="space-y-2">
                {userReviews.length > 0 ? (
                  userReviews
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3)
                    .map(review => (
                      <div key={review.id} className="flex items-start py-2 border-b border-gray-100">
                        <svg className="w-5 h-5 text-amber-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">
                            Reviewed <Link href={`/restaurant/info?id=${review.restaurantId}`} className="font-medium text-amber-700 hover:text-amber-900">
                              {getRestaurantName(review.restaurantId)}
                            </Link>
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 py-2">No activity yet</p>
                )}
                
                {userReviews.length > 3 && (
                  <div className="text-right pt-2">
                    <a href="#reviews" className="text-amber-700 hover:text-amber-900 text-sm font-medium">
                      View all reviews →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div id="reviews" className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews
              {userReviews.length > 0 && (
                <span className="ml-2 text-gray-500 text-lg">({userReviews.length})</span>
              )}
            </h2>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
              <select
                id="sort"
                value={reviewSortOption}
                onChange={(e) => setReviewSortOption(e.target.value)}
                className="p-1.5 border border-gray-300 rounded-md text-sm focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="rating-desc">Highest Rating</option>
                <option value="rating-asc">Lowest Rating</option>
              </select>
            </div>
          </div>
          
          {userReviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 mb-6">
                {isOwnProfile 
                  ? "You haven't reviewed any coffee shops yet. Share your experiences and help others discover great places!"
                  : `${profileData.name} hasn't reviewed any coffee shops yet.`
                }
              </p>
              
              {isOwnProfile && (
                <Link 
                  href="/restaurant" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium"
                >
                  Browse Coffee Shops
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortReviews(userReviews).map(review => (
                <div key={review.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="border-b border-gray-100 px-6 py-4">
                    <div className="flex justify-between items-center mb-2">
                      <Link 
                        href={`/restaurant/info?id=${review.restaurantId}`}
                        className="text-xl font-bold text-gray-900 hover:text-amber-700"
                      >
                        {getRestaurantName(review.restaurantId)}
                      </Link>
                      <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                        ★ {review.rating}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{review.title}</h3>
                    <p className="text-gray-600 mb-2 text-sm">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="px-6 py-4">
                    <p className="text-gray-700 mb-4">{review.text}</p>
                    <Link 
                      href={`/restaurant/info?id=${review.restaurantId}`}
                      className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                    >
                      View Coffee Shop →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Recommendations Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockRestaurants.slice(0, 3).map(shop => (
              <div key={shop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={`/assets/shop${(shop.id % 2) + 1}.svg`}
                    alt={shop.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{shop.name}</h3>
                    <div className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-sm">
                      ★ {shop.rating}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{shop.address}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {shop.tags.slice(0, 2).map(tag => (
                      <span key={tag.id} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/restaurant/info?id=${shop.id}`}
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}