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
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50';

const variants = {
  primary:
    'bg-primary text-white shadow-button hover:bg-primary-dark hover:shadow-[0_4px_12px_rgba(46,106,79,0.3)]',
  secondary:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 hover:border-primary',
  inverted:
    'bg-white text-primary shadow-card hover:bg-white/95 hover:-translate-y-0.5',
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
