// src/app/api/works/[id]/route.js

import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request, { params }) {
  const { id } = params
  
  try {
    const work = await prisma.work.findUnique({
      where: { id }
    })
    
    if (!work) {
      return NextResponse.json(
        { error: 'Work not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(work)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching work' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  const { id } = params
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
    
    // Get existing work
    const existingWork = await prisma.work.findUnique({
      where: { id }
    })
    
    if (!existingWork || existingWork.memberId !== member.id) {
      return NextResponse.json(
        { error: 'Work not found or unauthorized' },
        { status: 404 }
      )
    }
    
    // Count featured works excluding current work
    const featuredCount = await prisma.work.count({
      where: { 
        memberId: member.id,
        isFeatured: true,
        NOT: { id }
      }
    })
    
    // If trying to feature but already have 3 featured
    if (data.isFeatured && featuredCount >= 3) {
      return NextResponse.json(
        { error: 'You can only feature up to 3 works' },
        { status: 400 }
      )
    }
    
    const updatedWork = await prisma.work.update({
      where: { id },
      data
    })
    
    return NextResponse.json(updatedWork)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating work' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const { id } = params
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
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
    
    // Get existing work
    const work = await prisma.work.findUnique({
      where: { id }
    })
    
    if (!work || work.memberId !== member.id) {
      return NextResponse.json(
        { error: 'Work not found or unauthorized' },
        { status: 404 }
      )
    }
    
    await prisma.work.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting work' },
      { status: 500 }
    )
  }
}