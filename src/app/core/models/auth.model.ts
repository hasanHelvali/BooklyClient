export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
}

export interface TokenResponse {
  token: string;
  expiresAt: string;
}
