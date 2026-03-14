'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { CartIcon as CartIconComponent } from '@/components/CartIcon';
import { WishlistIcon } from '@/components/WishlistIcon';

const CUSTOMER_STORAGE_KEYS = ['customer-email', 'customer-id', 'customer-first-name', 'customer-last-name', 'customer-phone'];

function getIsCustomerLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem('customer-email') && localStorage.getItem('customer-id'));
}

function clearCustomerSession(): void {
  CUSTOMER_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/consultation', label: 'Free Consultation' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  // { href: '/manufacturing-quality', label: 'Manufacturing & Quality' },
  { href: '/ngo', label: 'NGO' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const { data: session, status } = useSession();

  // Sync customer login state from localStorage (WooCommerce auth); re-check on route change so it updates after login
  useEffect(() => {
    setIsCustomerLoggedIn(getIsCustomerLoggedIn());
  }, [pathname]);
  useEffect(() => {
    const handleStorage = () => setIsCustomerLoggedIn(getIsCustomerLoggedIn());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Only show as logged in when NextAuth is authenticated (not loading) or customer has both email and id
  const isLoggedIn =
    (status === 'authenticated' && !!session?.user) || isCustomerLoggedIn;

  const handleLogout = () => {
    setMobileOpen(false);
    if (session?.user) {
      signOut({ callbackUrl: '/' });
    } else {
      clearCustomerSession();
      router.push('/');
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-tight flex h-16 md:h-20 items-center justify-between gap-4">
        {/* Logo - Left */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-1">
          <Image
            src="https://9gk.22b.myftpupload.com/wp-content/uploads/2025/01/cropped-DRS-Logo-e1771510375912.png"
            alt="DRS Health"
            width={100}
            height={80}
            className="h-8 w-auto"
          />
        </Link>

        {/* Centered Navigation + Right (grouped so Contact and Search are close) */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-3 min-w-0">
          <nav className="flex items-center gap-4 lg:gap-6" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-bold text-body-muted hover:text-primary transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>
          {/* Right - Search, Account/Auth, Cart - tight to nav */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-1 relative">
          <div className="relative">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              className="p-2 text-foreground hover:opacity-70 transition-opacity"
              onClick={() => setSearchOpen((o) => !o)}
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            {searchOpen && (
              <>
                <div className="absolute right-0 top-full mt-1 z-50 min-w-[280px] sm:min-w-[320px] bg-white rounded-xl border border-border shadow-lg overflow-hidden">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const q = searchQuery.trim();
                      setSearchOpen(false);
                      setSearchQuery('');
                      if (q) router.push(`/shop?q=${encodeURIComponent(q)}`);
                    }}
                    className="flex"
                  >
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 px-3 py-2.5 text-sm text-foreground placeholder:text-body-muted focus:outline-none border-0"
                      autoFocus
                      aria-label="Search products"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2.5 bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shrink-0"
                    >
                      Search
                    </button>
                  </form>
                </div>
                <div
                  className="fixed inset-0 z-40"
                  aria-hidden
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                />
              </>
            )}
          </div>

          {/* Not logged in: Login + Sign up */}
          {!isLoggedIn && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/auth/login"
                className="text-sm text-body-muted hover:text-primary transition-colors px-2 py-1"
              >
                Login
              </Link>
              <span className="text-border">|</span>
              <Link
                href="/auth/signup"
                className="text-sm text-primary font-medium hover:text-primary-dark transition-colors px-2 py-1"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Logged in: Account link + Logout */}
          {isLoggedIn && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/account"
                aria-label="Account"
                className="p-2 text-foreground hover:opacity-70 transition-opacity"
              >
                <AccountIcon className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-primary font-medium hover:text-primary-dark transition-colors px-2 py-1"
              >
                Logout
              </button>
            </div>
          )}

          <WishlistIcon className="p-2 text-foreground hover:opacity-70 transition-opacity" />
          <CartIconComponent className="p-2 text-foreground hover:opacity-70 transition-opacity" />
          </div>
        </div>

        {/* Mobile only: Cart + Menu */}
        <div className="flex md:hidden items-center gap-1 flex-shrink-0">
          <WishlistIcon className="p-2 text-foreground hover:opacity-70 transition-opacity" />
          <CartIconComponent className="p-2 text-foreground hover:opacity-70 transition-opacity" />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container-tight py-4 flex flex-col gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-body-muted hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            
            {/* Mobile Auth Links - Only show if not logged in */}
            {!isLoggedIn && (
              <div className="border-t border-border mt-4 pt-4 flex flex-col gap-2">
                <Link
                  href="/wishlist"
                  className="py-2 text-body-muted hover:text-primary font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  ♡ My Wishlist
                </Link>
                <Link
                  href="/auth/login"
                  className="py-2 text-body-muted hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="py-2 text-primary font-medium hover:text-primary-dark"
                  onClick={() => setMobileOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Show account link if logged in */}
            {isLoggedIn && (
              <div className="border-t border-border mt-4 pt-4 flex flex-col gap-2">
                <Link
                  href="/wishlist"
                  className="py-2 text-body-muted hover:text-primary font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  ♡ My Wishlist
                </Link>
                <Link
                  href="/account"
                  className="py-2 text-body-muted hover:text-primary font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 text-primary font-medium hover:text-primary-dark text-left"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Search dropdown is inline under the search icon above */}
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
