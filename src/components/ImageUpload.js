'use client'
import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

export default function ImageUpload({ onSuccess, initialUrl }) {
  const [url, setUrl] = useState(initialUrl || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="mb-4">
      {url ? (
        <div className="flex flex-col items-center">
          <Image
          height={150}
          width={150} 
            src={url} 
            alt="Preview" 
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
          />
          <button 
            onClick={() => {
              setUrl(null)
              if (onSuccess) onSuccess(null)
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="bpa_unsigned" // 👈 Your preset name goes here
          options={{
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // ✅ this should be in your .env
            sources: ['local'],
            multiple: false,
            cropping: true,
            croppingAspectRatio: 1,
            croppingShowDimensions: true,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png'],
            maxFileSize: 5_000_000
          }}
          onUploadAdded={() => setIsLoading(true)}
          onSuccess={(result) => {
            const url = result.info.secure_url
            setUrl(url)
            if (onSuccess) onSuccess(url)
            setIsLoading(false)
          }}
          onError={(error) => {
            console.error('Upload error:', error)
            setError(`Upload failed: ${error.message || 'Unknown error'}`)
            setIsLoading(false)
          }}
          onAbort={() => setIsLoading(false)}
        >
          {({ open }) => (
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => open()} 
                disabled={isLoading}
                className={`px-4 py-2 rounded-md ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? 'Preparing upload...' : 'Upload Image'}
              </button>
              <p className="mt-2 text-sm text-gray-500">
                JPG, PNG up to 5MB
              </p>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  )
}
