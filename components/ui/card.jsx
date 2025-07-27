'use client';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-md border p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}