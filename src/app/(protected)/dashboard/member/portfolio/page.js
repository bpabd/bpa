'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PortfolioPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [works, setWorks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    
    fetchWorks()
  }, [session, router])

  const fetchWorks = async () => {
    try {
      const response = await fetch(`/api/works?memberId=${session.user.id}`)
      const data = await response.json()
      setWorks(data)
    } catch (err) {
      setError('Failed to fetch works')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this work?')) return
    
    try {
      const response = await fetch(`/api/works/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchWorks() // Refresh list
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
        fetchWorks() // Refresh list
      }
    } catch (err) {
      setError('Failed to update work')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your portfolio...</p>
      </div>
    )
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
                    <span className="text-gray-500">Video: {work.title}</span>
                  </div>
                ) : work.imageUrl ? (
                  <img 
                    src={work.imageUrl} 
                    alt={work.title} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
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
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {work.isFeatured ? 'Featured ★' : 'Mark as Featured'}
                    </button>
                    
                    <div className="flex space-x-2">
                      <Link 
                        href={`/dashboard/member/portfolio/edit/${work.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(work.id)}
                        className="text-red-600 hover:text-red-800"
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