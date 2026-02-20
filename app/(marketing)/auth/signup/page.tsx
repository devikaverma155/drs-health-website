import { Metadata } from 'next';
import { SignUpForm } from './SignUpForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a new DRS Health account to track orders and manage your profile.',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
