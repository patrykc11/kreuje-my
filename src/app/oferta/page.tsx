import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import PackageOptionCard from "@/components/PackageOptionCard";

export default function OMnie() {
  const packageOptions = [
    {
      title: "KONSULTACJE",
      description: `Pomoc na dowolnym etapie 
budowy, remontu lub 
udoskonaleniu wnętrza. Szybki 
zbiór inspiracji oraz ułatwienie 
podjęcia trudnych decyzji.`
    },
    {
      title: "MEBLE NA WYMIAR",
      description: `Posiadają nie tylko aspekt 
wizualny ale także techniczny. 
To rozwiązanie wyjątkowo 
indywidualne dopracowane w 
najmniejszym detalu.`
    },
    {
      title: "UKŁAD FUNKCJONALNY",
      description: `Organizacja przestrzeni to 
podstawowy element projektu. 
Zapewnia ergonomiczne 
użytkowanie wnętrza i pomaga 
maksymalnie wykorzystać metraż.`
    },
    {
      title: "DOKUMENTACJA TECHNICZNA",
      description: `Umożliwia dokładne i zgodne z 
projektem wykonanie wnętrza. 
Jest to ,,instrukcja obsługi" dla 
wykonawców.`
    },
    {
      title: "WIZUALIZACJE",
      description: `Realistyczne ujęcia twojego wnętrza 
pozwolą zobaczyć jak będzie 
wyglądać efekt finalny, podjąć 
decyzję oraz uniknąć błędów.`
    },
    {
      title: "ZARZĄDZANIE PRACAMI I KOORDYNACJA WYKONAWCÓW",
      description: `Oszczędza twój czas i stres. 
Zwiększa pewność, że wnętrze 
będzie zgodne z projektem oraz 
pomaga unikać błędów, opóźnień 
i dodatkowych kosztów.`
    },
  ]


  return (
    <div className="border-2 border-amber-800  h-full w-full z-10">
      <Hero
        backgroundImageUrl="/images/oferta-glowne.jpg"
        leftElement={<p className="text-black text-6xl relative top-[-42px]">OFERTA</p>}
        rightElement={<div className="bg-amber-800 rounded-4xl w-1/3 text-center  relative top-[-42px] p-3">
          <p className="text-md text-white">
            UMÓW SIĘ NA BEZPŁATNĄ
            KONSULTACJE
          </p>
        </div>}
      />

      {/* O mnie section */}
      <div className="bg-amber-800 relative top-[-42px]" style={{ "borderRadius": "82px" }}>
        <div className="py-12">
          <div className="w-6/7 mx-auto gap-8 relative max-w-4xl">
            <div className="text-center text-white text-2xl mb-6 w-full border-2 border-white rounded-full p-1">USŁUGI</div>
            <div className="grid grid-cols-2 mx-auto justify-center items-stretch gap-8">
              {packageOptions.map((option, index) => (
                <div className="max-w-80 mx-auto h-full flex" key={index}>
                  <PackageOptionCard
                    title={option.title}
                    description={option.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div >

        <Contact
          photoUrl="/images/o-mnie-kontakt.jpg"
          backgroundColor="bg-white"
          logoUrl="/images/logo-biale-skrocone.png"
          title="KONTAKT"
        />
      </div >
    </div>
  );
}

