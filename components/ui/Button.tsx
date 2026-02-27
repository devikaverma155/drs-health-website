import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'inverted';
  href?: string;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const base =
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50';

const variants = {
  primary:
    'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:shadow-[0_12px_32px_rgba(212,175,55,0.3)] hover:from-primary-dark hover:to-primary transform hover:scale-105 active:scale-95',
  secondary:
    'border-2 border-primary text-primary bg-white/50 hover:bg-primary/10 hover:border-primary-dark hover:text-primary-dark transition-all',
  inverted:
    'bg-white/90 backdrop-blur-sm text-primary shadow-lg hover:bg-white/95 hover:shadow-xl hover:-translate-y-1 border border-white/60',
};

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  className = '',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
