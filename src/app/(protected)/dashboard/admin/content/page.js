'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ContentManagement() {
  const { data: session } = useSession()
  const router = useRouter()
  const [content, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/login')
      return
    }
    
    fetchContent()
  }, [session, router])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContent(data)
    } catch (err) {
      setError('Failed to fetch content')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchContent() // Refresh list
      }
    } catch (err) {
      setError('Failed to delete content')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading content...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <Link 
            href="/dashboard/admin/content/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {content.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {item.type.toLowerCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link 
                      href={`/dashboard/admin/content/edit/${item.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}