type TextareaProps = {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  id?: string;
};

export function Textarea({
  label,
  name,
  placeholder,
  required,
  rows = 4,
  className = '',
  id,
}: TextareaProps) {
  const inputId = id ?? name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full rounded-xl border border-input-border bg-white px-4 py-3 text-foreground placeholder:text-body-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y transition-colors duration-200"
      />
    </div>
  );
}
