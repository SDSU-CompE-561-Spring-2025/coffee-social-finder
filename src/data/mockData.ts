import { Restaurant, Tag } from "@/types";
import Image from "next/image";

export const mockTags: Tag[] = [
  { id: 1, name: "Cozy" },
  { id: 2, name: "Quiet" },
  { id: 3, name: "Busy" },
  { id: 4, name: "WiFi" },
  { id: 5, name: "Outdoor Seating" },
  { id: 6, name: "Study Friendly" },
  { id: 7, name: "Specialty Coffee" },
  { id: 8, name: "Breakfast" },
  { id: 9, name: "Lunch" },
  { id: 10, name: "Pastries" },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Holsem Coffee",
    address: "2911 University Ave, San Diego, CA 92104",
    rating: 4.5,
    phoneNumber: "(855) 923-3770",
    tags: [mockTags[0], mockTags[3], mockTags[6]],
    image: [
      "/assets/holsem/hol1.jpg",
      "/assets/holsem/hol2.jpg",
      "/assets/holsem/hol3.jpg",
    ],
  },
  {
    id: 2,
    name: "Lestats",
    address: "3343 Adams Ave, San Diego, CA 92116",
    rating: 4.5,
    phoneNumber: "(619) 282-0437",
    tags: [mockTags[2], mockTags[6], mockTags[9]],
    image: [
      "/assets/lestats/les1.jpg",
      "/assets/lestats/les2.jpg",
      "/assets/lestats/les3.jpg",
    ],
  },
  {
    id: 3,
    name: "S3 Coffee Bar",
    address: " 6225 Mission Gorge Rd, San Diego, CA 92120",
    rating: 4.6,
    phoneNumber: "(619) 693-5333",
    tags: [mockTags[0], mockTags[1], mockTags[5], mockTags[6]],
    image: [
      "/assets/S3CoffeeBar/s31.jpg",
      "/assets/S3CoffeeBar/s32.webp",
      "/assets/S3CoffeeBar/s33.png",
    ],
  },
  {
    id: 4,
    name: "Living Room",
    address: "321 Pine Rd, Elsewhere, USA",
    rating: 3.9,
    phoneNumber: "555-789-0123",
    tags: [mockTags[2], mockTags[7], mockTags[8]],
    image: [
      "/assets/livingroom/living1.jpg",
      "/assets/livingroom/living2.jpg",
      "/assets/livingroom/living3.jpg",
    ],
  },
  {
    id: 5,
    name: "A Tea 7",
    address: "5416 El Cajon Blvd, San Diego, CA 92115",
    rating: 4.6,
    phoneNumber: "(619) 394-4775",
    tags: [mockTags[3], mockTags[4], mockTags[5]],
    image: [
      "/assets/ATea7/at7.png",
      "/assets/ATea7/at72.png",
      "/assets/ATea7/at73.png",
    ],
  },
  {
    id: 6,
    name: "Scrimshaw Coffee",
    address: "5542 El Cajon Blvd, San Diego, CA 92115",
    rating: 4.7,
    phoneNumber: "(619) 501-2355",
    tags: [mockTags[0], mockTags[4], mockTags[9]],
    image: [
      "/assets/scrimshaw/scrim1.jpg",
      "/assets/scrimshaw/scrim2.jpg",
      "/assets/scrimshaw/scrim3.jpg",
    ],
  },
];
