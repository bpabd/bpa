'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function MemberImage({ src, alt, width, height, className }) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={true}
      onError={() => {
        console.error('Image failed to load, using fallback')
        setImgSrc('/default-avatar.png')
      }}
      onLoad={() => console.log('Image loaded successfully')}
    />
  )
}