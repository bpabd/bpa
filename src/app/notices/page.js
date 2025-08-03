import prisma from '@/lib/db'

export default async function NoticesPage() {
  const notices = await prisma.content.findMany({
    where: { type: 'NOTICE' },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">BPA Notices</h1>
        
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices available</p>
        ) : (
          <div className="space-y-6">
            {notices.map(notice => (
              <div key={notice.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{notice.title}</h2>
                <p className="text-gray-600 whitespace-pre-line">{notice.body}</p>
                <p className="text-sm text-gray-400 mt-4">
                  Posted: {new Date(notice.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}