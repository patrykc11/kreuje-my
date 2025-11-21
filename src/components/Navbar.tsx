import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  darkTheme?: boolean;
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
          <Link href="/">HOME</Link>
          <Link href="/o-mnie">O MNIE</Link>
          <Link href="/oferta">OFERTA</Link>
          <Link href="/projekty">PROJEKTY</Link>
          <Link href="/kontakt">KONTAKT</Link>
        </div>
      </span>
      {/* Navbar icons */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center`}>
            <Image src={whatsappIcon} alt="Whats App" width={24} height={24} />
          </div>
        </Link>
        <Link href="/">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center`}>
            <Image src={fbIcon} alt="Facebook" width={24} height={24} />
          </div>
        </Link>
        <Link href="/">
          <div className={`w-10 h-10 ${iconBgColor} rounded-full p-2 flex items-center justify-center`}>
            <Image src={instaIcon} alt="Instagram" width={24} height={24} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar