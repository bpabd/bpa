import { v2 as cloudinary } from 'cloudinary'

export async function POST(request) {
  try {
    const { paramsToSign } = await request.json()
    
    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    )
    
    return Response.json({ 
      signature,
      uploadPreset: "bpa_unsigned", // ✅ Just return it, don't configure it here
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      timestamp: paramsToSign.timestamp
    })
  } catch (error) {
    console.error('Cloudinary sign error:', error)
    return Response.json(
      { error: 'Failed to generate signature', details: error.message },
      { status: 500 }
    )
  }
}
