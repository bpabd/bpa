import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    )
  }
  
  try {
    // Get member profile
    const member = await prisma.member.findUnique({
      where: { userId },
      include: {
        works: true
      }
    })
    
    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }
    
    // Calculate profile completeness
    const fields = [
      'fullName', 'bio', 'dob', 'workplace', 
      'bloodGroup', 'region', 'profileImage'
    ]
    
    const filledFields = fields.filter(field => 
      member[field] !== null && member[field] !== '' && member[field] !== undefined
    ).length
    
    const profileComplete = Math.round((filledFields / fields.length) * 100)
    
    // Get work stats
    const featuredWorks = member.works.filter(work => work.isFeatured).length
    const totalWorks = member.works.length
    
    return NextResponse.json({
      profileComplete,
      featuredWorks,
      totalWorks,
      memberId: member.id
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching stats' },
      { status: 500 }
    )
  }
}