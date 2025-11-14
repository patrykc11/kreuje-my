import Image from "next/image";
import Navbar from "@/components/Navbar";

const packageOptions = [
  {
    title: "BASIC",
    description: "To idealna opcja dla osób, które chcą zobaczyć pomysł na aranżację i samodzielnie zająć się realizacją."
  },
  {
    title: "KOMFORT",
    description: "Dzięki temu zakresowi projekt można zrealizować krok po kroku, dokładnie tak, jak został zaplanowany."
  },
  {
    title: "PREMIUM",
    description: "To rozwiązanie dla osób, które potrzebują większej elastyczności i doradztwa przy jednocześnie większych możliwościach i dużym wyborze."
  }
];

const offerItems = [
  "KONSULTACJE",
  "UKŁAD FUNKCJONALNY",
  "WIZUALIZACJE",
  "MEBLE NA WYMIAR",
  "DOKUMENTACJA TECHNICZNA",
  "ZARZĄDZANIE PRACAMI I KOORDYNACJA WYKONAWCÓW"
];

export default function Home() {
  return (
    <div className="border-2 border-amber-800 rounded-xl h-full w-full">

      {/* Hero section */}
      <div
        className="relative flex flex-col min-h-[75vh] w-full justify-between"
        style={{
          backgroundImage: 'url(/images/hero-main.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Navbar />
        {/* Gradient overlay - fade to white at top and bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 10%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.75) 90%, rgba(255,255,255,0.95) 100%)'
          }}
        ></div>

        {/* Hero overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-6/7 mx-auto my-8">
          {/* logo */}
          <div className="flex items-center justify-between w-full px-8">
            <Image src="/images/nazwa.png" alt="Logo" width={400} height={400} />
            <div className="bg-amber-800 rounded-4xl p-2 w-1/3 text-center">
              <p className="text-md text-white">
                Nie żyj po prostu w swoim wnętrzu - rozwijaj
                się w nim dzięki wyjątkowemu projektowi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offer section */}
      <div className="bg-amber-800" style={{ "borderTopRightRadius": "82px", "borderTopLeftRadius": "82px" }}>
        <div className="flex items-start justify-between w-6/7 mx-auto py-12">
          <div className="py-2 pb-8 rounded-4xl text-white border-2 border-white w-1/3 max-w-80 overflow-visible flex flex-col items-center justify-center">
            <p className="text-md text-center mb-4">OFERTA</p>
            <ul className="list-none text-sm w-[130%] max-w-96 text-center flex flex-col gap-6">
              {offerItems.map((item, index) => (
                <li key={index} className="bg-white text-black p-4 rounded-4xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/3 flex gap-4 items-center justify-center flex-col">
            <div className="px-4 py-2 rounded-4xl text-white border-1 border-white text-center">
              <p className="text-md">KOMPLEKSOWY PROJEKT WNĘTRZA</p>
            </div>
            {packageOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-4xl p-5 px-8 relative">
                <h3 className="text-lg mb-4">{option.title}</h3>
                <p className="text-sm">{option.description}</p>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-amber-800 border-2 border-white w-12 h-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="bg-amber-800">
        <div className="bg-white" style={{ "borderTopRightRadius": "82px", "borderTopLeftRadius": "82px" }}>
          <div className="flex items-center justify-between w-6/7 mx-auto py-12">
            <div className="w-1/3">
              <h2 className="text-2xl mb-4">O MNIE</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
