// src/app/(protected)/dashboard/member/layout.js

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function MemberLayout({ children }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  // Check if member profile exists
  const member = await prisma.member.findUnique({
    where: { userId: session.user.id }
  })
  
  // Redirect to profile setup if not completed
  if (!member) {
    redirect('/dashboard/member/profile')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}