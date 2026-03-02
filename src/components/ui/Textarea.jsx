export default function Textarea({ label, error, className = '', ...props }) {
  return (
    <label className="form-control w-full">
      {label ? <span className="mb-1 text-sm font-medium text-slate-700">{label}</span> : null}
      <textarea
        {...props}
        className={`textarea textarea-bordered w-full bg-white ${error ? 'textarea-error' : ''} ${className}`.trim()}
      />
      {error ? <span className="mt-1 text-xs text-error">{error}</span> : null}
    </label>
  );
}
