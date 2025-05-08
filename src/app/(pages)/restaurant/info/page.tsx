'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { mockRestaurants, mockTags } from "@/data/mockData"

// Review type definition
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

export default function RestaurantDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [restaurant, setRestaurant] = useState<any>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({
    title: '',
    rating: 5,
    text: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const reviewFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get current user from localStorage
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem('currentUser')
      if (userJson) {
        setCurrentUser(JSON.parse(userJson))
      }
    }

    // Get restaurant ID from URL query parameter
    const id = searchParams?.get('id')
    
    if (id) {
      // Find restaurant in mock data
      const foundRestaurant = mockRestaurants.find(r => r.id === parseInt(id))
      if (foundRestaurant) {
        setRestaurant(foundRestaurant)
        
        // Load restaurant reviews from localStorage
        if (typeof window !== 'undefined') {
          const storedReviews = JSON.parse(localStorage.getItem('restaurantReviews') || '[]')
          const restaurantReviews = storedReviews.filter(
            (review: Review) => review.restaurantId === parseInt(id)
          )
          setReviews(restaurantReviews)
        }
      } else {
        // Restaurant not found, redirect to restaurants page
        router.push('/restaurant')
      }
    }
  }, [searchParams, router])

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseInt(value) : value
    })
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) {
      alert('Please log in to submit a review')
      return
    }
    
    if (!restaurant) return
    
    setIsSubmitting(true)
    
    // Create new review object
    const reviewData: Review = {
      id: Date.now(), // Use timestamp as unique ID
      restaurantId: restaurant.id,
      userId: currentUser.id || 0,
      userName: currentUser.name || 'Anonymous',
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      date: new Date().toISOString()
    }
    
    // Get existing reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem('restaurantReviews') || '[]')
    
    // Add new review
    const updatedReviews = [...existingReviews, reviewData]
    
    // Save to localStorage
    localStorage.setItem('restaurantReviews', JSON.stringify(updatedReviews))
    
    // Update the current page reviews
    setReviews([...reviews, reviewData])
    
    // Reset form
    setNewReview({
      title: '',
      rating: 5,
      text: ''
    })
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
    }, 3000)
  }

  const scrollToReviewForm = () => {
    if (reviewFormRef.current) {
      reviewFormRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === restaurant.image.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? restaurant.image.length - 1 : prevIndex - 1
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="mb-4 text-amber-600">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Coffee Shop Not Found</h1>
          <p className="text-gray-600 mb-6">The coffee shop you're looking for doesn't exist or has been removed.</p>
          <Link href="/restaurant" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium">
            Browse All Coffee Shops
          </Link>
        </div>
      </div>
    )
  }

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
    : restaurant.rating.toFixed(1)

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Link href="/restaurant" className="text-amber-700 hover:text-amber-900 font-medium inline-flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to all coffee shops
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            {/* Restaurant Image Carousel */}
            <div className="md:w-1/2 relative">
              <div className="h-72 md:h-full relative">
                {restaurant.image.map((src:string, index: number) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${restaurant.name} - image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                
                {/* Carousel controls */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                
                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {restaurant.image.map((src: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Restaurant Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900 font-serif">{restaurant.name}</h1>
                <div className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  ★ {averageRating}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <p className="text-gray-700">{restaurant.address}</p>
                </div>
                
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <p className="text-gray-700">{restaurant.phoneNumber}</p>
                </div>
                
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  <p className="text-gray-700">
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">About</h2>
                <p className="text-gray-700">
                  {restaurant.name} is a cozy coffee shop located in {restaurant.address.split(',')[0]}. 
                  Known for their exceptional {restaurant.tags.map((t: {id: number, name: string}) => t.name.toLowerCase()).join(', ')}, 
                  they offer a welcoming atmosphere for coffee lovers of all kinds.
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {restaurant.tags.map((tag: any) => (
                    <Link 
                      key={tag.id} 
                      href={`/restaurant?tag=${tag.id}`}
                      className="rounded-full bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 text-sm hover:bg-amber-100 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={scrollToReviewForm}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Write a Review
                </button>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews
              {reviews.length > 0 && <span className="ml-2 text-gray-500 text-lg">({reviews.length})</span>}
            </h2>
            
            <div className="flex items-center">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold">{averageRating}</span>
            </div>
          </div>
          
          {/* Write a review section */}
          <div ref={reviewFormRef} className="mb-8 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Write a Review</h3>
            
            {!currentUser ? (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <p className="text-gray-700 mb-4">Please log in to share your experience</p>
                <div className="flex justify-center space-x-3">
                  <Link 
                    href="/login" 
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center mb-4">
                  <span className="mr-3 font-medium text-gray-700">Your Rating:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={newReview.rating === star}
                          onChange={handleReviewChange}
                          className="sr-only"
                        />
                        <svg
                          className={`w-8 h-8 ${
                            newReview.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                          } hover:text-yellow-400`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Review Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newReview.title}
                    onChange={handleReviewChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Summarize your experience"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="text"
                    name="text"
                    value={newReview.text}
                    onChange={handleReviewChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Tell others about your experience with this coffee shop"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  
                  <p className="text-sm text-gray-500">
                    Posting as <span className="font-medium">{currentUser.name}</span>
                  </p>
                </div>
                
                {submitSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Thank you for your review!</p>
                      <p className="text-sm">Your feedback helps others discover great coffee shops.</p>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
          
          {/* Reviews list */}
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <p className="text-gray-600 text-lg">No reviews yet for this coffee shop.</p>
              <p className="text-gray-500 mt-1">Be the first to leave a review and help others discover this place!</p>
              <button
                onClick={scrollToReviewForm}
                className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Write a Review
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{review.title}</h3>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                  
                  <div className="flex items-center border-t border-gray-100 pt-4 mt-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-medium">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{review.userName}</p>
                      <Link 
                        href={`/profile?user=${review.userId}`}
                        className="text-sm text-amber-700 hover:text-amber-900"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Similar Coffee Shops Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockRestaurants
              .filter(r => r.id !== restaurant.id)
              .slice(0, 3)
              .map(shop => (
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