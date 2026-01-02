import React from 'react'

export default function Error() {
  return (
    <>
    
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Oops! Page Not Found</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Home
        </a>
      </div>
    
    </>
  )
}
