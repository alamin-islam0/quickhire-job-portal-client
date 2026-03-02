export default function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1220px] px-4 sm:px-7 ${className}`}>{children}</div>;
}
