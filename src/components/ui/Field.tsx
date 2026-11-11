import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import Icon from '../Icon';

// Form fields (guidelines p.7): label always above the field, 2px green border,
// terracotta-deep message below on error, in plain words.
const control = (error?: boolean) =>
  [
    'block w-full min-h-tap rounded-btn border-2 bg-white px-3 py-2 text-body text-ink placeholder:text-grey/80',
    error ? 'border-terracotta-deep' : 'border-green',
  ].join(' ');

interface FieldProps {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Wraps a control with its label, hint and error. Give the control the same `id`. */
export function Field({ id, label, hint, error, className = '', children }: FieldProps) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <label htmlFor={id} className="font-bold text-green">{label}</label>
      {hint && <p id={`${id}-hint`} className="m-0 text-base text-grey">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="m-0 flex items-center gap-1.5 text-base font-bold text-terracotta-deep">
          <Icon name="warning" size={18} /> {error}
        </p>
      )}
    </div>
  );
}

/** aria-describedby wiring for a control inside <Field>. */
export const describedBy = (id: string, { hint, error }: { hint?: unknown; error?: unknown }) =>
  [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;

type WithError = { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & WithError>(
  ({ invalid, className = '', ...rest }, ref) => (
    <input ref={ref} aria-invalid={invalid || undefined} className={`${control(invalid)} ${className}`} {...rest} />
  ),
);
Input.displayName = 'Input';

export function Select({ invalid, className = '', children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & WithError) {
  return (
    <select aria-invalid={invalid || undefined} className={`${control(invalid)} pr-8 ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function Textarea({ invalid, className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & WithError) {
  return <textarea aria-invalid={invalid || undefined} className={`${control(invalid)} ${className}`} {...rest} />;
}
