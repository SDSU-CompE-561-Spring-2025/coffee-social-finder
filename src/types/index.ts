export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    phoneNumber: string;
    tags: Tag[];
    image: string[];
  }
  
  export interface Tag {
    id: number;
    name: string;
  }