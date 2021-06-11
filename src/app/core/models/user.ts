export interface User {
  token?: string;
  refreshToken?: string;
  expirationTime?: string;
  userId?: number;
  email?: string;
  role?: 'RECRUITER' | 'JOB_SEEKER';
}
