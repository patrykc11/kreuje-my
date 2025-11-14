import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center z-10 w-5/6 my-6 mx-auto">
      {/* Navbar links */}
      <div className="flex items-center gap-8 text-amber-950">
        <Link href="/">HOME</Link>
        <Link href="/o-mnie">O MNIE</Link>
        <Link href="/oferta">OFERTA</Link>
        <Link href="/projekty">PROJEKTY</Link>
        <Link href="/kontakt">KONTAKT</Link>
      </div>
      {/* Navbar icons */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <div className="w-10 h-10 bg-amber-950 rounded-full p-2 flex items-center justify-center">
            <Image src="/icons/whatsapp_bialy.png" alt="Whats App" width={24} height={24} />
          </div>
        </Link>
        <Link href="/">
          <div className="w-10 h-10 bg-amber-950 rounded-full p-2 flex items-center justify-center">
            <Image src="/icons/fb_bialy.png" alt="Facebook" width={24} height={24} />
          </div>
        </Link>
        <Link href="/">
          <div className="w-10 h-10 bg-amber-950 rounded-full p-2 flex items-center justify-center">
            <Image src="/icons/insta_bialy.png" alt="Instagram" width={24} height={24} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar