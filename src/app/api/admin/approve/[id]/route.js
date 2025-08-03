import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request, { params }) {
  const { id } = params

  try {
    // Approve member
    const member = await prisma.member.update({
      where: { id },
      data: { isApproved: true },
      include: { user: true }
    })

    // Send approval email
    await resend.emails.send({
      from: 'noreply@bpa.org',
      to: member.user.email,
      subject: 'Your BPA Membership Has Been Approved',
      html: `
        <p>Dear ${member.fullName},</p>
        <p>We're pleased to inform you that your membership with the Broadcast Producers Association (BPA) has been approved!</p>
        <p>You can now log in to your account and complete your profile:</p>
        <p><a href="${process.env.NEXTAUTH_URL}/login">Login to your account</a></p>
        <p>Thank you for joining our community of producers.</p>
        <p>Best regards,<br>The BPA Team</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}