// src/components/PortfolioSection.js

'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
})

export default function PortfolioSection({ works }) {
  if (!works || works.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">No featured works added yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Add your work portfolio to showcase your productions
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {works.map(work => (
        <div key={work.id} className="border rounded-lg overflow-hidden shadow-md">
          {work.videoUrl ? (
            <div className="aspect-video bg-black">
              <ReactPlayer
                url={work.videoUrl}
                width="100%"
                height="100%"
                controls
                light
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  },
                  vimeo: {
                    playerOptions: { byline: false }
                  }
                }}
              />
            </div>
          ) : work.imageUrl ? (
            <div className="aspect-square">
              <Image
              height={150}
              width={150} 
                src={work.imageUrl} 
                alt={work.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="bg-gray-200 border-2 border-dashed aspect-square flex items-center justify-center">
              <span className="text-gray-500">No media</span>
            </div>
          )}
          
          <div className="p-3 bg-white">
            <h3 className="font-bold text-lg text-gray-800">{work.title}</h3>
            {work.description && (
              <p className="text-gray-600 mt-1 text-sm">{work.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}