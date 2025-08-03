import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  const { id } = params

  try {
    // Delete member and associated user
    const member = await prisma.member.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      )
    }

    // Delete member
    await prisma.member.delete({
      where: { id }
    })

    // Delete user
    await prisma.user.delete({
      where: { id: member.userId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}