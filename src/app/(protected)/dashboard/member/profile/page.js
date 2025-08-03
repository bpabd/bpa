'use client'
import { useSession } from 'next-auth/react'
import ImageUpload from '@/components/ImageUpload'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatDateDisplay } from '@/lib/dateUtils'

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    dob: '',
    workplace: '',
    bloodGroup: '',
    region: '',
    facebookUrl: '',
    linkedinUrl: '',
    contactNumber: '',
    profileImage: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState('')

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/members?userId=${session.user.id}`)
      const data = await response.json()
      if (data) {
        setFormData({
          fullName: data.fullName || '',
          bio: data.bio || '',
          // Format dates for input fields
          dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
          workplace: data.workplace || '',
          bloodGroup: data.bloodGroup || '',
          region: data.region || '',
          facebookUrl: data.facebookUrl || '',
          linkedinUrl: data.linkedinUrl || '',
          contactNumber: data.contactNumber || '',
          profileImage: data.profileImage || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchProfile()
    }
  }, [session])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, profileImage: url }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/members', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          ...formData
        })
      })
      
      if (response.ok) {
        setSuccess('Profile updated successfully!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const error = await response.json()
        console.error('Update failed:', error)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
        
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <ImageUpload 
              onSuccess={handleImageUpload} 
              initialUrl={formData.profileImage}
            />
          </div>
          
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <input
                id="bloodGroup"
                name="bloodGroup"
                type="text"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 mb-1">
              Workplace
            </label>
            <input
              id="workplace"
              name="workplace"
              type="text"
              value={formData.workplace}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <input
              id="region"
              name="region"
              type="text"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook URL
              </label>
              <input
                id="facebookUrl"
                name="facebookUrl"
                type="url"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
                type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}