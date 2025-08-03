// src/app/(protected)/dashboard/member/page.js

'use client'

import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/dashboard/StatsCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MemberDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    
    fetchStats()
  }, [session, router])

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/members/stats?userId=${session.user.id}`)
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Profile Completeness"
            value={`${stats?.profileComplete || 0}%`}
            description="How complete is your profile"
          />
          
          <StatsCard 
            title="Featured Works"
            value={stats?.featuredWorks || 0}
            description="Out of 3 possible"
          />
          
          <StatsCard 
            title="Total Works"
            value={stats?.totalWorks || 0}
            description="In your portfolio"
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/dashboard/member/profile"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </Link>
            
            <Link 
              href="/dashboard/member/portfolio/new"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add New Work
            </Link>
            
            <Link 
              href={`/members/${stats?.memberId}`}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              View Public Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}