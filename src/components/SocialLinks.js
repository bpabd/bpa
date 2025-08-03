// src/components/SocialLinks.js
export default function SocialLinks({ member }) {
  return (
    <div className="mt-4 flex justify-center md:justify-start space-x-4">
      {member.facebookUrl && (
        <a 
          href={member.facebookUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>
      )}
      
      {member.linkedinUrl && (
        <a 
          href={member.linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      )}
      
      {member.contactNumber && (
        <a 
          href={`tel:${member.contactNumber}`}
          className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          aria-label="Phone"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 22.621l-3.521-3.511c-1.22 1.22-2.535 2.025-3.979 2.025-1.464 0-2.816-.846-4.032-2.062-2.469-2.469-4.113-6.98-4.113-10.508 0-3.53 1.644-8.039 4.113-10.508 1.216-1.216 2.568-2.062 4.032-2.062 1.444 0 2.759.805 3.979 2.025l3.521-3.511.001 22.621zm-9.469-10.539c-.33-.33-.854-.33-1.184 0-.33.33-.33.854 0 1.184.33.33.854.33 1.184 0 .33-.33.33-.854 0-1.184zm4.469 0c-.33-.33-.854-.33-1.184 0-.33.33-.33.854 0 1.184.33.33.854.33 1.184 0 .33-.33.33-.854 0-1.184z"/>
          </svg>
        </a>
      )}
    </div>
  )
}