'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import WorkForm from '@/components/WorkForm'
import Link from 'next/link'

export default function NewWorkPage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/login')
    return null
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
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Work</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <WorkForm />
        </div>
      </div>
    </div>
  )
}