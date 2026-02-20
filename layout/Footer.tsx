import Link from 'next/link';
import Image from 'next/image';

const SHOP_LINKS = [
  { href: '/shop?category=weight-management', label: 'Weight Management' },
  { href: '/shop?category=liver-care', label: 'Liver Care' },
  { href: '/shop?category=immunity', label: 'Immunity' },
  { href: '/shop?category=diabetes', label: 'Diabetes' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/manufacturing-quality', label: 'Manufacturing & Quality' },
  { href: '/consultation', label: 'Free Consultation' },
  { href: '/ngo', label: 'NGO' },
  { href: '/contact', label: 'Contact' },
];

const HELP_LINKS = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
];

const LEGAL_LINKS = [
  { href: '/terms-and-conditions', label: 'Terms and Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/returns-refunds', label: 'Returns & Refunds' },
  { href: '/shipping', label: 'Shipping Policy' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div>
            <Link href="/" className="text-xl font-semibold">
               <Image
                          src="https://drshealth.in/wp-content/uploads/2025/01/cropped-DRS-Logo-e1771510375912.png"
                          alt="DRS Health"
                          width={100}
                          height={100}
                          className="h-8 w-auto"
                        />
                          <span className="block text-lg text-white/90 mt-1">Private Limited</span>
                      
            </Link>
             
            <p className="mt-4 text-sm text-white/80 max-w-xs leading-relaxed">
           
              Authentic Ayurvedic wellness. Trusted formulations for modern health.
            </p>
            <Link
              href="/consultation"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-accent-mint text-primary-dark px-4 py-2.5 text-sm font-semibold hover:bg-white transition-all duration-200"
            >
              Free Consultation
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {SHOP_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm transition-colors duration-200 ${
                      label === 'Free Consultation'
                        ? 'text-accent-mint font-medium hover:text-white inline-flex items-center'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Help
            </h3>
            <ul className="space-y-2">
              {HELP_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © {currentYear} DRS Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
