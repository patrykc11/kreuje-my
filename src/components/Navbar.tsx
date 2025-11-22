import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'

interface NavbarProps {
  darkTheme?: boolean;
}

const socialLinks = {
  'whatsapp': 'https://wa.me/',
  'facebook': 'https://www.facebook.com/profile.php?id=61551211920272',
  'instagram': 'https://www.instagram.com/kreuje.my',
}

const NavLink = ({ href, children, darkTheme }: { href: string, children: ReactNode, darkTheme: boolean }) => {
  const borderColor = darkTheme ? 'border-amber-800' : 'border-black';


  return (
    <Link href={href} className="relative group flex items-center justify-center">
      <span className="relative z-10">{children}</span>
      <div className={`absolute w-14 h-14 rounded-full border ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
    </Link>
  )
}

const Navbar = ({ darkTheme = false }: NavbarProps) => {
  const linkTextColor = darkTheme ? 'text-white' : 'text-amber-950';
  const iconBgColor = 'bg-amber-800';
  const whatsappIcon = '/icons/whatsapp_bialy.png';
  const fbIcon = '/icons/fb_bialy.png';
  const instaIcon = '/icons/insta_bialy.png';

  return (
    <div className="flex justify-between items-center z-10 w-5/6 my-6 mx-auto font-display text-lg tracking-wide">
      {/* Navbar links */}
      <span>
        <div className={`flex items-center gap-8 ${linkTextColor}`}>
          <NavLink href="/" darkTheme={darkTheme}>HOME</NavLink>
          <NavLink href="/o-mnie" darkTheme={darkTheme}>O MNIE</NavLink>
          <NavLink href="/oferta" darkTheme={darkTheme}>OFERTA</NavLink>
          <NavLink href="/projekty" darkTheme={darkTheme}>PROJEKTY</NavLink>
          <NavLink href="/kontakt" darkTheme={darkTheme}>KONTAKT</NavLink>
        </div>
      </span>
      {/* Navbar icons */}
      <div className="flex items-center gap-5">
        <Link href={socialLinks.whatsapp} target="_blank" className="group">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12`}>
            <Image src={whatsappIcon} alt="Whats App" width={24} height={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </Link>
        <Link href={socialLinks.facebook} target="_blank" className="group">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12`}>
            <Image src={fbIcon} alt="Facebook" width={24} height={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </Link>
        <Link href={socialLinks.instagram} target="_blank" className="group">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12`}>
            <Image src={instaIcon} alt="Instagram" width={24} height={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
