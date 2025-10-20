import React from 'react';

export default function LoadingSpinner({ size = 8 }) {
  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent h-${size} w-${size}`}
        style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: undefined }}
      >
        { }
        <svg className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
