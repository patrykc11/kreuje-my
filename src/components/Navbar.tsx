'use client';

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

interface NavbarProps {
  darkTheme?: boolean;
}

const socialLinks = {
  'whatsapp': 'https://wa.me/',
  'facebook': 'https://www.facebook.com/profile.php?id=61551211920272',
  'instagram': 'https://www.instagram.com/kreuje.my',
}

const NavLink = ({ href, children, darkTheme, onClick }: { href: string, children: ReactNode, darkTheme: boolean, onClick?: () => void }) => {
  const borderColor = darkTheme ? 'border-amber-800' : 'border-black';

  return (
    <Link href={href} className="relative group flex items-center justify-center" onClick={onClick}>
      <span className="relative z-10">{children}</span>
      <div className={`absolute w-14 h-14 rounded-full border ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
    </Link>
  )
}

const Navbar = ({ darkTheme = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const linkTextColor = darkTheme ? 'text-white' : 'text-amber-950';
  const iconBgColor = 'bg-amber-800';
  const whatsappIcon = '/icons/whatsapp_bialy.png';
  const fbIcon = '/icons/fb_bialy.png';
  const instaIcon = '/icons/insta_bialy.png';
  const hamburgerColor = darkTheme ? 'bg-white' : 'bg-amber-950';

  return (
    <div className="flex justify-between items-center z-50 w-5/6 my-6 mx-auto font-display text-lg tracking-wide relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden absolute right-0 top-4 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        >
          <span className={`block w-8 h-0.5 ${isOpen ? 'bg-amber-950 rotate-45 translate-y-2' : hamburgerColor} transition-all duration-300`}></span>
          <span className={`block w-8 h-0.5 ${isOpen ? 'opacity-0' : hamburgerColor} transition-all duration-300`}></span>
          <span className={`block w-8 h-0.5 ${isOpen ? 'bg-amber-950 -rotate-45 -translate-y-2' : hamburgerColor} transition-all duration-300`}></span>
        </button>
      </div>

      {/* Desktop Navbar links */}
      <div className={`hidden md:flex items-center gap-8 ${linkTextColor}`}>
        <NavLink href="/" darkTheme={darkTheme}>HOME</NavLink>
        <NavLink href="/o-mnie" darkTheme={darkTheme}>O MNIE</NavLink>
        <NavLink href="/oferta" darkTheme={darkTheme}>OFERTA</NavLink>
        <NavLink href="/projekty" darkTheme={darkTheme}>PROJEKTY</NavLink>
        <NavLink href="/kontakt" darkTheme={darkTheme}>KONTAKT</NavLink>
      </div>

      {/* Navbar icons */}
      <div className="hidden md:flex items-center gap-5">
        <Link href={socialLinks.whatsapp} target="_blank">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center`}>
            <Image src={whatsappIcon} alt="Whats App" width={24} height={24} />
          </div>
        </Link>
        <Link href={socialLinks.facebook} target="_blank">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center`}>
            <Image src={fbIcon} alt="Facebook" width={24} height={24} />
          </div>
        </Link>
        <Link href={socialLinks.instagram} target="_blank">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center`}>
            <Image src={instaIcon} alt="Instagram" width={24} height={24} />
          </div>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8
        transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col items-center gap-8 text-amber-950 text-2xl">
          <NavLink href="/" darkTheme={false} onClick={() => setIsOpen(false)}>HOME</NavLink>
          <NavLink href="/o-mnie" darkTheme={false} onClick={() => setIsOpen(false)}>O MNIE</NavLink>
          <NavLink href="/oferta" darkTheme={false} onClick={() => setIsOpen(false)}>OFERTA</NavLink>
          <NavLink href="/projekty" darkTheme={false} onClick={() => setIsOpen(false)}>PROJEKTY</NavLink>
          <NavLink href="/kontakt" darkTheme={false} onClick={() => setIsOpen(false)}>KONTAKT</NavLink>
        </div>

        <div className="flex items-center gap-5 mt-8">
          <Link href={socialLinks.whatsapp} target="_blank">
            <div className={`w-12 h-12 ${iconBgColor} rounded-full p-3 flex items-center justify-center`}>
              <Image src={whatsappIcon} alt="Whats App" width={32} height={32} />
            </div>
          </Link>
          <Link href={socialLinks.facebook} target="_blank">
            <div className={`w-12 h-12 ${iconBgColor} rounded-full p-3 flex items-center justify-center`}>
              <Image src={fbIcon} alt="Facebook" width={32} height={32} />
            </div>
          </Link>
          <Link href={socialLinks.instagram} target="_blank">
            <div className={`w-12 h-12 ${iconBgColor} rounded-full p-3 flex items-center justify-center`}>
              <Image src={instaIcon} alt="Instagram" width={32} height={32} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
