'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ContentForm({ initialData }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    type: 'NEWS'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        body: initialData.body || '',
        type: initialData.type || 'NEWS'
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const url = initialData 
        ? `/api/content/${initialData.id}` 
        : '/api/content'
      
      const method = initialData ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        router.push('/dashboard/admin/content')
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
          Title
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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Content Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="NEWS">News</option>
          <option value="EVENT">Event</option>
          <option value="NOTICE">Notice</option>
        </select>
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="body"
          name="body"
          rows="10"
          required
          value={formData.body}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading 
            ? (initialData ? 'Updating...' : 'Creating...') 
            : (initialData ? 'Update Content' : 'Create Content')
          }
        </button>
      </div>
    </form>
  )
}