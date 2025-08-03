// src/app/api/works/route.js

import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const memberId = searchParams.get('memberId')
  
  if (!memberId) {
    return NextResponse.json(
      { error: 'Member ID is required' },
      { status: 400 }
    )
  }
  
  try {
    const works = await prisma.work.findMany({
      where: { memberId }
    })
    
    return NextResponse.json(works)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching works' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const data = await request.json()
    
    // Get member ID from user session
    const member = await prisma.member.findUnique({
      where: { userId: session.user.id }
    })
    
    if (!member) {
      return NextResponse.json(
        { error: 'Member profile not found' },
        { status: 404 }
      )
    }
    
    // Count featured works
    const featuredCount = await prisma.work.count({
      where: { 
        memberId: member.id,
        isFeatured: true
      }
    })
    
    // If trying to feature but already have 3 featured
    if (data.isFeatured && featuredCount >= 3) {
      return NextResponse.json(
        { error: 'You can only feature up to 3 works' },
        { status: 400 }
      )
    }
    
    // Create new work
    const newWork = await prisma.work.create({
      data: {
        ...data,
        memberId: member.id
      }
    })
    
    return NextResponse.json(newWork)
  } catch (error) {
    console.error('Work creation error:', error)
    return NextResponse.json(
      { error: 'Error creating work', details: error.message },
      { status: 500 }
    )
  }
}