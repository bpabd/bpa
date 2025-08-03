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
    const member = await prisma.member.findUnique({
      where: { userId },
      include: { user: true }
    })
    
    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching member', error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const data = await request.json()
    const { userId, ...profileData } = data
    
    // Convert date fields to Date objects or null
    if (profileData.dob) {
      profileData.dob = new Date(profileData.dob)
    } else {
      profileData.dob = null
    }
    
    // Update member profile
    const updatedMember = await prisma.member.update({
      where: { userId },
      data: profileData
    })
    
    return NextResponse.json(updatedMember)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { 
        message: 'Error updating profile',
        error: error.message,
        code: error.code 
      },
      { status: 500 }
    )
  }
}