export interface CreateCategoryRequest {
  name: string;
}
export interface CreateCategoryResponse {
  message: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}
