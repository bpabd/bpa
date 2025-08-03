// src/app/api/register/route.js

import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email, password, fullName, memberId } = await request.json()
    
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      )
    }
    
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        role: 'MEMBER',
        memberProfile: {
          create: {
            fullName,
            memberId,
          }
        }
      }
    })
    
    return NextResponse.json(
      { message: 'Registration successful! Admin approval required.' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    )
  }
}