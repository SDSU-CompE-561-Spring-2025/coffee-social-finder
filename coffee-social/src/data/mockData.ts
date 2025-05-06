import { Restaurant, Tag } from '../types';

export const mockTags: Tag[] = [
  { id: 1, name: 'Cozy' },
  { id: 2, name: 'Quiet' },
  { id: 3, name: 'Busy' },
  { id: 4, name: 'WiFi' },
  { id: 5, name: 'Outdoor Seating' },
  { id: 6, name: 'Study Friendly' },
  { id: 7, name: 'Specialty Coffee' },
  { id: 8, name: 'Breakfast' },
  { id: 9, name: 'Lunch' },
  { id: 10, name: 'Pastries' },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'The Coffee Bean',
    address: '123 Main St, Anytown, USA',
    rating: 4.5,
    phoneNumber: '555-123-4567',
    tags: [mockTags[0], mockTags[3], mockTags[6]],
  },
  {
    id: 2,
    name: 'Espresso Express',
    address: '456 Oak Ave, Somewhere, USA',
    rating: 4.2,
    phoneNumber: '555-987-6543',
    tags: [mockTags[2], mockTags[6], mockTags[9]],
  },
  {
    id: 3,
    name: 'Brew Haven',
    address: '789 Elm St, Nowhere, USA',
    rating: 4.8,
    phoneNumber: '555-456-7890',
    tags: [mockTags[0], mockTags[1], mockTags[5], mockTags[6]],
  },
  {
    id: 4,
    name: 'Morning Grind',
    address: '321 Pine Rd, Elsewhere, USA',
    rating: 3.9,
    phoneNumber: '555-789-0123',
    tags: [mockTags[2], mockTags[7], mockTags[8]],
  },
  {
    id: 5,
    name: 'Caffeine Corner',
    address: '654 Maple Dr, Anywhere, USA',
    rating: 4.6,
    phoneNumber: '555-321-6540',
    tags: [mockTags[3], mockTags[4], mockTags[5]],
  },
  {
    id: 6,
    name: 'Latte Lounge',
    address: '987 Cedar Ln, Someplace, USA',
    rating: 4.3,
    phoneNumber: '555-654-3210',
    tags: [mockTags[0], mockTags[4], mockTags[9]],
  },
];