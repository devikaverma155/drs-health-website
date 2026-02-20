import { Metadata } from 'next';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Login to Account',
  description: 'Login to your DRS Health account to access your profile and orders.',
};

export default function LoginPage() {
  return <LoginForm />;
}
