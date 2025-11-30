import Image from "next/image";

interface ContactItem {
  icon: string;
  text: string;
  alt: string;
  href?: string;
}

const defaultContactItems: ContactItem[] = [
  {
    icon: "/icons/komorka_biala.png",
    text: "+48 690 143 393",
    alt: "Telefon",
    href: "tel:+48690143393"
  },
  {
    icon: "/icons/mail_bialy.png",
    text: "kontakt.kreujemy@gmail.com",
    alt: "Email",
    href: "mailto:kontakt.kreujemy@gmail.com"
  },
  {
    icon: "/icons/fb_bialy.png",
    text: "@Kreuje.MY",
    alt: "Facebook",
    href: "https://www.facebook.com/p/KreujeMY-61551211920272/"
  },
  {
    icon: "/icons/insta_bialy.png",
    text: "@kreuje.my",
    alt: "Instagram",
    href: "https://www.instagram.com/kreuje.my"
  }
];

interface ContactProps {
  photoUrl: string;
  backgroundColor?: string;
  logoUrl?: string;
  title?: string;
  contactItems?: ContactItem[];
  photoWidth?: number;
  photoHeight?: number;
  logoWidth?: number;
  logoHeight?: number;
}

const Contact = ({
  photoUrl,
  backgroundColor = "bg-white",
  logoUrl,
  title = "KONTAKT",
  contactItems = defaultContactItems,
  photoWidth = 500,
  photoHeight = 500,
  logoWidth = 150,
  logoHeight = 150
}: ContactProps) => {

  const liBgColor = backgroundColor === "bg-white" ? "border-amber-800" : "bg-white border-white";
  const textColor = backgroundColor === "bg-white" ? "text-black" : "text-white";

  return (
    <div className={`${backgroundColor} p-12 max-md:p-6 ${backgroundColor !== 'bg-white' ? 'rounded-[82px]' : ''} -mb-[2px] -mx-[2px]`}>
      <div className="w-6/7 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-evenly">
        <div className="relative flex items-center justify-center w-full md:w-auto">
          <Image
            src={photoUrl}
            alt={title}
            width={photoWidth}
            height={photoHeight}
            className="rounded-4xl"
          />
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={title}
              width={logoWidth}
              height={logoHeight}
              className="rounded-4xl absolute left-0 top-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h2 className={`text-2xl text-center mb-4 ${textColor}`}>{title}</h2>
          {contactItems.map((item, index) => {
            const content = (
              <div className={`flex items-center justify-start gap-4 border ${liBgColor} rounded-4xl pr-8 ${item.href ? 'cursor-pointer hover-lift transition-all duration-300' : 'hover-lift transition-all duration-300'} overflow-hidden group`}>
                <div className="w-8 h-8 bg-amber-800 rounded-full p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <Image src={item.icon} alt={item.alt} width={24} height={24} />
                </div>

                {/* Desktop View: Restore original simple layout */}
                <div className="hidden md:block text-center w-full">
                  <p>{item.text}</p>
                </div>

                {/* Mobile View: Advanced layout with truncation and marquee */}
                <div className="md:hidden text-center w-full min-w-0 overflow-hidden relative" style={{ containerType: 'inline-size' }}>
                  {item.text.length > 25 ? (
                    <div className="block w-max min-w-full animate-[marquee-bounce_5s_linear_infinite_alternate]">
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <p className="truncate">{item.text}</p>
                  )}
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={index}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;

