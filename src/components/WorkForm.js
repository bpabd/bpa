// src/components/WorkForm.js 

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

export default function WorkForm({ initialData }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    imageUrl: '',
    isFeatured: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        videoUrl: initialData.videoUrl || '',
        imageUrl: initialData.imageUrl || '',
        isFeatured: initialData.isFeatured || false
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Reset previous image if video is added
    if (formData.videoUrl) {
      setFormData(prev => ({ ...prev, imageUrl: '' }))
    }
    
    try {
      const url = initialData 
        ? `/api/works/${initialData.id}` 
        : '/api/works'
      
      const method = initialData ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        router.push('/dashboard/member/portfolio')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Something went wrong')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Work Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Video URL (YouTube/Vimeo)
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          placeholder="https://youtube.com/..."
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter full URL (e.g., https://www.youtube.com/watch?v=...)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or Upload an Image
        </label>
        <ImageUpload 
          onSuccess={handleImageUpload} 
          initialUrl={formData.imageUrl}
        />
        <p className="text-xs text-gray-500 mt-1">
          Max file size: 5MB (JPG, PNG)
        </p>
      </div>

      <div className="flex items-center">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          checked={formData.isFeatured}
          onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
          Feature this work on my profile
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading 
            ? (initialData ? 'Updating...' : 'Creating...') 
            : (initialData ? 'Update Work' : 'Add Work')
          }
        </button>
      </div>
    </form>
  )
}