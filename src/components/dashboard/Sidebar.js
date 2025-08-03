// src/components/dashboard/Sidebar.js

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/member" },
  { name: "Profile", href: "/dashboard/member/profile" },
  { name: "Portfolio", href: "/dashboard/member/portfolio" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Member Dashboard</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
