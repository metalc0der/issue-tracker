'use client';

import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];

  return (
      <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
          <Link href="/"><AiFillBug /></Link>
          <ul className="flex space-x-6">
              {links.map((link) => (
                  <li key={link.label}>
                      <Link
                          key={link.href}
                          href={link.href}
                          className={classNames({
                              "text-zinc-900": currentPath === link.href,
                              "text-zinc-500": currentPath !== link.href,
                              "hover:text-zinc-800 transition-colors": true,
                          })}
                          >
                          {link.label}
                      </Link>
                  </li>
              ))}
          </ul>
      </nav>
  );
}

export default NavBar