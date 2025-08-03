// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <span className="bg-indigo-600 text-white text-xl font-bold px-2 py-1 mr-2 rounded">BPA</span>
              <span className="font-bold text-xl">Broadcast Producers</span>
            </div>
            <p className="text-gray-400 mb-4">
              The premier association for broadcast professionals in Bangladesh, fostering creativity and industry growth since 2010.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              {[/* Add social links */].map((social, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Social Media</span>
                  <div className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">s</div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Executive Committee', href: '/committee' },
                { name: 'Members Directory', href: '/members' },
                { name: 'Latest News', href: '/news' },
                { name: 'Upcoming Events', href: '/events' },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Industry Notices', href: '/notices' },
                { name: 'Membership Benefits', href: '/membership' },
                { name: 'Code of Conduct', href: '/code' },
                { name: 'Production Guidelines', href: '/guidelines' },
                { name: 'FAQ', href: '/faq' },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">BPA Headquarters</p>
              <p className="mb-2">123 Media Street, Dhaka 1212</p>
              <p className="mb-2">Bangladesh</p>
              <p className="mb-2">Email: info@bpa-bd.org</p>
              <p>Phone: +880 1234 567890</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Broadcast Producers Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}