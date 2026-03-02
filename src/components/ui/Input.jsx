export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="form-control w-full">
      {label ? <span className="mb-1 text-sm font-medium text-slate-700">{label}</span> : null}
      <input
        {...props}
        className={`input input-bordered h-11 w-full bg-white ${error ? 'input-error' : ''} ${className}`.trim()}
      />
      {error ? <span className="mt-1 text-xs text-error">{error}</span> : null}
    </label>
  );
}
