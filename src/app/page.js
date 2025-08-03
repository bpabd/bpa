// app/page.js
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';

// Revalidate homepage every 24 hours
export const revalidate = 86400;

async function getFeaturedMembers() {
  try {
    // Get total approved members count
    const totalMembers = await prisma.member.count({
      where: { isApproved: true }
    });

    // Calculate random skip value
    const skip = Math.floor(Math.random() * Math.max(0, totalMembers - 3));

    // Fetch 3 random approved members
    return await prisma.member.findMany({
      where: { isApproved: true },
      take: 3,
      skip: skip,
      select: {
        id: true,
        fullName: true,
        bio: true,
        profileImage: true,
        memberSince: true
      }
    });
  } catch (error) {
    console.error('Error fetching featured members:', error);
    return [];
  }
}

async function getLatestNews() {
  try {
    return await prisma.content.findMany({
      where: { type: 'NEWS' },
      orderBy: { createdAt: 'desc' },
      take: 2,
      select: {
        id: true,
        title: true,
        body: true,
        createdAt: true
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function getLatestEvents() {
  try {
    return await prisma.content.findMany({
      where: { type: 'EVENT' },
      orderBy: { createdAt: 'desc' },
      take: 2,
      select: {
        id: true,
        title: true,
        body: true,
        createdAt: true
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function Home() {
  const [featuredMembers, latestNews, latestEvents] = await Promise.all([
    getFeaturedMembers(),
    getLatestNews(),
    getLatestEvents()
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Broadcast Producers Association
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mb-8">
            Uniting creative visionaries in the broadcasting industry since 2010
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/members" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition duration-300">
              Explore Members
            </Link>
            <Link href="/about" className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition duration-300">
              About BPA
            </Link>
          </div>
        </div>
        
        {/* Video Background - Simulated */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0"></div>
          <div className="grid grid-cols-4 gap-0.5 opacity-20 absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-700 aspect-video animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-indigo-700 mb-2">500+</div>
              <h3 className="text-xl font-semibold">Creative Members</h3>
              <p className="text-gray-600 mt-2">Industry-leading producers & directors</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-indigo-700 mb-2">13+</div>
              <h3 className="text-xl font-semibold">Years Established</h3>
              <p className="text-gray-600 mt-2">Serving the broadcast community</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-indigo-700 mb-2">1500+</div>
              <h3 className="text-xl font-semibold">Projects Showcased</h3>
              <p className="text-gray-600 mt-2">Award-winning productions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Producers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover some of our most influential members</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-500 relative overflow-hidden">
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-white border-4 border-white rounded-full overflow-hidden">
                    {member.profileImage ? (
                      <Image 
                        src={member.profileImage} 
                        alt={member.fullName}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xl font-bold">
                          {member.fullName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-16">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.fullName}</h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {member.bio || 'Esteemed broadcast producer with notable industry contributions'}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Member since: {member.memberSince ? new Date(member.memberSince).getFullYear() : 'N/A'}
                  </p>
                  <Link href={`/members/${member.id}`} className="text-indigo-600 font-medium hover:underline">
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/members" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition duration-300">
              Browse All Members
            </Link>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
                <Link href="/news" className="text-indigo-600 hover:underline">View All</Link>
              </div>
              <div className="space-y-6">
                {latestNews.map((news) => (
                  <div key={news.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{news.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{news.body}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>
                            {new Date(news.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="mx-2">•</span>
                          <Link href={`/news#${news.id}`} className="text-indigo-600 hover:underline">Read More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
                <Link href="/events" className="text-indigo-600 hover:underline">View All</Link>
              </div>
              <div className="space-y-6">
                {latestEvents.map((event) => {
                  const eventDate = new Date(event.createdAt);
                  return (
                    <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex gap-6">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white w-20 h-20 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                          <div className="text-2xl font-bold">{eventDate.getDate()}</div>
                          <div className="text-sm">
                            {eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{event.body}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>Dhaka, Bangladesh</span>
                            <span className="mx-2">•</span>
                            <Link href={`/events#${event.id}`} className="text-indigo-600 hover:underline">Details</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community of Creatives</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Become part of Bangladesh premier network for broadcast professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
              Register as Member
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}