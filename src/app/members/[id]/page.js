import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import PortfolioSection from '@/components/PortfolioSection'
import SocialLinks from '@/components/SocialLinks'
import MemberImage from '@/components/MemberImage'

// Date helper remains the same
const safeDate = (dateStr) => {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

// Metadata generator remains the same
export async function generateMetadata({ params }) {
  const id = await Promise.resolve(params.id)
  try {
    const member = await prisma.member.findUnique({ where: { id } })
    if (!member) return {}
    return {
      title: `${member.fullName} | BPA Member`,
      description: member.bio || `${member.fullName} is a member of the Broadcast Producers Association`
    }
  } catch (error) {
    return {}
  }
}

export default async function MemberDetailPage({ params }) {
  const id = await Promise.resolve(params.id)
  try {
    const member = await prisma.member.findUnique({
      where: { id },
      include: { 
        works: {
          where: { isFeatured: true },
          take: 3
        }
      }
    })

    if (!member) notFound()

    const memberSince = safeDate(member.memberSince)

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-700 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Profile Image with Glow Effect */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-blue-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative">
                    {member.profileImage ? (
                      <MemberImage
                        src={member.profileImage}
                        alt={member.fullName}
                        width={160}
                        height={160}
                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
                        <span className="text-gray-500 text-lg">No Photo</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center md:text-left space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{member.fullName}</h1>
                  {member.title && (
                    <p className="text-xl text-blue-100 font-medium">{member.title}</p>
                  )}
                  <div className="pt-2">
                    <SocialLinks member={member} className="flex justify-center md:justify-start space-x-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
              {/* About Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                    About
                  </h2>
                  {member.bio ? (
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  ) : (
                    <p className="text-gray-400 italic">No bio provided</p>
                  )}
                </div>

                {/* Portfolio Section */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                    Featured Works
                  </h2>
                  <PortfolioSection works={member.works} />
                </div>
              </div>

              {/* Details Sidebar */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm h-fit sticky top-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                  Member Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-sm text-gray-900">{memberSince?.toLocaleDateString() || 'N/A'}</p>
                    </div>
                  </div>

                  {member.memberId && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Member ID</p>
                        <p className="text-sm text-gray-900">{member.memberId}</p>
                      </div>
                    </div>
                  )}

                  {member.region && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Region</p>
                        <p className="text-sm text-gray-900">{member.region}</p>
                      </div>
                    </div>
                  )}

                  {member.contactNumber && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Contact</p>
                        <a href={`tel:${member.contactNumber}`} className="text-sm text-blue-600 hover:underline">
                          {member.contactNumber}
                        </a>
                      </div>
                    </div>
                  )}

                  {member.bloodGroup && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Blood Group</p>
                        <p className="text-sm text-gray-900">{member.bloodGroup}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading member:', error)
    notFound()
  }
}