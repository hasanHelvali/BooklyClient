export interface CreateProductRequest {
  name: string;
  author: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  author: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
}
