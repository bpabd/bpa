// src/app/(protected)/dashboard/admin/page.js

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  // Fetch unapproved members
  const pendingMembers = await prisma.member.findMany({
    where: { isApproved: false },
    include: { user: true }
  })

  // Fetch all members
  const allMembers = await prisma.member.findMany({
    include: { user: true }
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Approvals</h2>
            
            {pendingMembers.length === 0 ? (
              <p className="text-gray-500">No pending approvals</p>
            ) : (
              <div className="space-y-4">
                {pendingMembers.map(member => (
                  <div key={member.id} className="border p-4 rounded-lg">
                    <h3 className="font-medium">{member.fullName}</h3>
                    <p className="text-sm text-gray-600">{member.user.email}</p>
                    <p className="text-sm">Member ID: {member.memberId}</p>
                    
                    <div className="mt-3 flex space-x-2">
                      <form action={`/api/admin/approve/${member.id}`} method="POST">
                        <button 
                          type="submit"
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          Approve
                        </button>
                      </form>
                      
                      <form action={`/api/admin/reject/${member.id}`} method="POST">
                        <button 
                          type="submit"
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* All Members */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">All Members ({allMembers.length})</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allMembers.map(member => (
                    <tr key={member.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <Link 
                          href={`/members/${member.id}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {member.fullName}
                        </Link>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {member.isApproved ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            Approved
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {!member.isApproved && (
                          <form action={`/api/admin/approve/${member.id}`} method="POST">
                            <button 
                              type="submit"
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs mr-2"
                            >
                              Approve
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}