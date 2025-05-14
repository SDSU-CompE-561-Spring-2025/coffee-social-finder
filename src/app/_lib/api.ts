const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Fetch all restaurants.
 */
export const fetchRestaurants = async () => {
  const response = await fetch(`${BASE_URL}/restaurants`);
  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return response.json();
};

/**
 * Fetch a single restaurant by ID.
 * @param id - The ID of the restaurant.
 */
export const fetchRestaurantById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/restaurants/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch restaurant details");
  }
  return response.json();
};

/**
 * Fetch reviews for a specific restaurant.
 * @param restaurantId - The ID of the restaurant.
 */
export const fetchReviewsByRestaurantId = async (restaurantId: string) => {
  const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};

/**
 * Submit a new review for a restaurant.
 * @param restaurantId - The ID of the restaurant.
 * @param reviewData - The review data to submit.
 */
export const submitReview = async (restaurantId: string, reviewData: any) => {
  const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) {
    throw new Error("Failed to submit review");
  }
  return response.json();
};

/**
 * Fetch similar restaurants.
 * @param restaurantId - The ID of the restaurant to find similar ones.
 */
export const fetchSimilarRestaurants = async (restaurantId: string) => {
  const response = await fetch(`${BASE_URL}/restaurants/similar?id=${restaurantId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch similar restaurants");
  }
  return response.json();
};

export const fetchAvailableImages = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/available-images`);
  if (!response.ok) {
    throw new Error('Failed to fetch available images');
  }
  return response.json();
};