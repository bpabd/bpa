// src/lib/utils.js


import bcrypt from 'bcryptjs'

// Password hashing
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// Generate member ID
export const generateMemberId = () => {
  return `BPA-${Math.floor(1000 + Math.random() * 9000)}`
}