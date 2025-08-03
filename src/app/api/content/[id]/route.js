import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { id } = params
  
  try {
    const content = await prisma.content.findUnique({
      where: { id }
    })
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching content' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  const { id } = params
  const { title, body, type } = await request.json()
  
  try {
    const updatedContent = await prisma.content.update({
      where: { id },
      data: { title, body, type }
    })
    
    return NextResponse.json(updatedContent)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating content' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const { id } = params
  
  try {
    await prisma.content.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting content' },
      { status: 500 }
    )
  }
}