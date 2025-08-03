'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ContentForm from '@/components/ContentForm'
import Link from 'next/link'

export default function NewContentPage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || session.user.role !== 'ADMIN') {
    router.push('/login')
    return null
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
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Content</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ContentForm />
        </div>
      </div>
    </div>
  )
}