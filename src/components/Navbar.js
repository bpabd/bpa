// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-800 flex items-center">
            <span className="bg-indigo-700 text-white px-2 py-1 mr-2 rounded">BPA</span>
            Broadcast Producers
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="font-medium text-gray-700 hover:text-indigo-600 transition">About</Link>
            <Link href="/committee" className="font-medium text-gray-700 hover:text-indigo-600 transition">Committee</Link>
            <Link href="/members" className="font-medium text-gray-700 hover:text-indigo-600 transition">Members</Link>
            <Link href="/news" className="font-medium text-gray-700 hover:text-indigo-600 transition">News</Link>
            <Link href="/events" className="font-medium text-gray-700 hover:text-indigo-600 transition">Events</Link>
            <Link href="/notices" className="font-medium text-gray-700 hover:text-indigo-600 transition">Notices</Link>
            <Link href="/contact" className="font-medium text-gray-700 hover:text-indigo-600 transition">Contact</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-indigo-600 transition">Login</Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition hidden sm:block">
              Register
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}