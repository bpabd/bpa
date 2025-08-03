import prisma from '@/lib/db'

export default async function NewsPage() {
  const newsItems = await prisma.content.findMany({
    where: { type: 'NEWS' },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">BPA News</h1>
        
        {newsItems.length === 0 ? (
          <p className="text-gray-500">No news available</p>
        ) : (
          <div className="space-y-6">
            {newsItems.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-600 whitespace-pre-line">{item.body}</p>
                <p className="text-sm text-gray-400 mt-4">
                  Published: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}