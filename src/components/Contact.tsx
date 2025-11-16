import Image from "next/image";

interface ContactItem {
  icon: string;
  text: string;
  alt: string;
}

const defaultContactItems: ContactItem[] = [
  {
    icon: "/icons/komorka_biala.png",
    text: "+48 690 143 393",
    alt: "Telefon"
  },
  {
    icon: "/icons/mail_bialy.png",
    text: "kontakt.kreujemy@gmail.com",
    alt: "Email"
  },
  {
    icon: "/icons/fb_bialy.png",
    text: "@Kreuje.MY",
    alt: "Facebook"
  },
  {
    icon: "/icons/insta_bialy.png",
    text: "@Kreuje.MY",
    alt: "Instagram"
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
  const textColor = backgroundColor === "bg-white" ? "text-amber-800" : "text-white";

  return (
    <div className={`${backgroundColor} p-12`} style={{ "borderRadius": "82px" }}>
      <div className="w-6/7 max-w-7xl mx-auto flex gap-8 items-start justify-evenly">
        <div className="relative flex items-center justify-center">
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
        <div className="flex flex-col gap-4">
          <h2 className={`text-2xl text-center mb-4 ${textColor}`}>{title}</h2>
          {contactItems.map((item, index) => (
            <div key={index} className={`flex items-center justify-start gap-4 border ${liBgColor} rounded-4xl pr-8`}>
              <div className="w-8 h-8 bg-amber-800 rounded-full p-2 flex items-center justify-center">
                <Image src={item.icon} alt={item.alt} width={24} height={24} />
              </div>
              <div className="text-center w-full">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

