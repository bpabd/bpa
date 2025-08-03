import MemberCard from '@/components/MemberCard'
import prisma from '@/lib/db'

async function getMembers() {
  return await prisma.member.findMany({
    where: { isApproved: true },
    include: { user: true }
  })
}

export default async function MembersPage() {
  const members = await getMembers()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">BPA Members Directory</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}