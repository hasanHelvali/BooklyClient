export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UpdateUserRoleRequest {
  userId: string;
  role: string;
}
