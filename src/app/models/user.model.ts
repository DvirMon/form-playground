export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: ('email' | 'sms' | 'push')[];
    theme: 'light' | 'dark' | 'system';
  };
}

export type UserFormErrors = {
  [K in keyof User]?: string;
} & {
  address?: {
    [K in keyof User['address']]?: string;
  };
  preferences?: {
    [K in keyof User['preferences']]?: string;
  };
};
