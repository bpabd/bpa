// src/app/(protected)/dashboard/member/portfolio/PortfolioPageClient.js

'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PortfolioPageClient() {
  const { data: session } = useSession()
  const router = useRouter()
  const [works, setWorks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!session) return
    
    const fetchWorks = async () => {
      try {
        const response = await fetch(`/api/works?memberId=${session.user.id}`)
        const data = await response.json()
        
        if (response.ok) {
          setWorks(data)
        } else {
          setError(data.error || 'Failed to fetch works')
        }
      } catch (err) {
        setError('Error loading portfolio')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchWorks()
  }, [session])
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this work?')) return
    
    try {
      const response = await fetch(`/api/works/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setSuccess('Work deleted successfully')
        setTimeout(() => {
          setSuccess('')
          router.refresh()
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to delete work')
      }
    } catch (err) {
      setError('Failed to delete work')
    }
  }

  const toggleFeatured = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/works/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentStatus })
      })
      
      if (response.ok) {
        setSuccess('Work updated successfully')
        setTimeout(() => {
          setSuccess('')
          router.refresh()
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update work')
      }
    } catch (err) {
      setError('Failed to update work')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Portfolio</h1>
          <Link 
            href="/dashboard/member/portfolio/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Work
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {success}
          </div>
        )}

        {works.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500 mb-4">You have not added any works yet</p>
            <Link 
              href="/dashboard/member/portfolio/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Your First Work
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map(work => (
              <div key={work.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {work.videoUrl ? (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="bg-gray-800 text-white px-2 py-1 rounded">
                      Video: {work.title}
                    </div>
                  </div>
                ) : work.imageUrl ? (
                  <Image
                  height={150}
                  width={150} 
                    src={work.imageUrl} 
                    alt={work.title} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                    <span className="text-gray-500">No media</span>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="font-bold text-lg">{work.title}</h3>
                  {work.description && (
                    <p className="text-gray-600 mt-1 text-sm">{work.description}</p>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => toggleFeatured(work.id, work.isFeatured)}
                      className={`px-3 py-1 rounded text-sm ${
                        work.isFeatured 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {work.isFeatured ? 'Featured ★' : 'Mark as Featured'}
                    </button>
                    
                    <div className="flex space-x-2">
                      <Link 
                        href={`/dashboard/member/portfolio/edit/${work.id}`}
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(work.id)}
                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-600">
          <p>You can feature up to 3 works. Featured works will appear prominently on your profile.</p>
        </div>
      </div>
    </div>
  )
}