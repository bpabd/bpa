import prisma from '@/lib/db'
import { NextResponse } from 'next/server'


export async function GET() {
  try {
    const content = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching content' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const { title, body, type } = await request.json()
    
    const newContent = await prisma.content.create({
      data: { title, body, type }
    })
    
    return NextResponse.json(newContent)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating content' },
      { status: 500 }
    )
  }
}