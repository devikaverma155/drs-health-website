type InputProps = {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
};

export function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  className = '',
  id,
}: InputProps) {
  const inputId = id ?? name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-input-border bg-white px-4 py-3 text-foreground placeholder:text-body-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
      />
    </div>
  );
}
