import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request) {
  try {
    const { email } = await request.json()
    
    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, a reset link will be sent' },
        { status: 200 }
      )
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour
    
    // Update user
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    })
    
    return NextResponse.json(
      { message: 'Password reset email sent (simulated)' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to process request', error: error.message },
      { status: 500 }
    )
  }
}