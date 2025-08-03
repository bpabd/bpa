'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import WorkForm from '@/components/WorkForm'
import Link from 'next/link'

export default function EditWorkPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [work, setWork] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    
    fetchWork()
  }, [id, session, router])

  const fetchWork = async () => {
    try {
      const response = await fetch(`/api/works/${id}`)
      const data = await response.json()
      
      if (response.ok) {
        setWork(data)
      } else {
        console.error('Failed to fetch work:', data.error)
      }
    } catch (err) {
      console.error('Error fetching work:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading work details...</p>
      </div>
    )
  }

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Work not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard/member/portfolio"
            className="text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Portfolio
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Work: {work.title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <WorkForm initialData={work} />
        </div>
      </div>
    </div>
  )
}