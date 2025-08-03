'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import ContentForm from '@/components/ContentForm'
import Link from 'next/link'

export default function EditContentPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/login')
      return
    }
    
    fetchContent()
  }, [id, session, router])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${id}`)
      const data = await response.json()
      setContent(data)
    } catch (err) {
      console.error('Failed to fetch content:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading content...</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Content not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/dashboard/admin/content"
            className="text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Content
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Content</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ContentForm initialData={content} />
        </div>
      </div>
    </div>
  )
}