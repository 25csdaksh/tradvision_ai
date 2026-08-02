export enum UserRole {
  USER = 'USER',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  createdAt: string;
  updatedAt: string;
}
