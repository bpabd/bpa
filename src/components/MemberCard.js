import Link from 'next/link'

export default function MemberCard({ member }) {
  return (
    <Link href={`/members/${member.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="p-4">
          {member.profileImage ? (
            <img 
              src={member.profileImage} 
              alt={member.fullName}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 mx-auto mb-4" />
          )}
          
          <h3 className="text-xl font-semibold text-center text-gray-800">{member.fullName}</h3>
          
          {member.workplace && (
            <p className="text-gray-600 text-center mt-1">{member.workplace}</p>
          )}
          
          <div className="mt-4 flex justify-center space-x-3">
            {member.facebookUrl && (
              <a href={member.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            
            {member.linkedinUrl && (
              <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}