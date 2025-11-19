import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import PackageOptionCard from "@/components/PackageOptionCard";
import Image from "next/image";

export default function Oferta() {
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

  const basicPackageItems = [
    "analiza potrzeb inwestora",
    "układ funkcjonalny wnętrza z możliwościa dwóch serii zmian",
    "zmiany w układzie ścian, jeśli są konieczne",
    "zestawienie produktów i kontrola budżetu",
    "wizualizacje 3D fotorealistyczne z możliwością jednej serii zmian",
    "kosztorys materiałów z upustem dla architektów",
    "konsultacje na każdym etapie projektu"
  ]

  const comfortPackageItems = [
    "analiza potrzeb inwestora",
    "układ funkcjonalny wnętrza z możliwościa dwóch serii zmian",
    "zmiany w układzie ścian, jeśli są konieczne",
    "zestawienie produktów i kontrola budżetu",
    "wizualizacje 3D fotorealistyczne z możliwością jednej serii zmian",
    "schemat elektryczny",
    "wytyczne wodno-kanalizacyjne",
    "projekt mebli na wymiar",
    "rzuty pomieszczeń 2D z wymiarami",
    "rzuty sufitów podwieszanych",
    "przekroje pomieszczeń 2D",
    "detale wymagające wytycznych",
    "kosztorys materiałów z upustem dla architektów",
    "konsultacje na każdym etapie projektu",
  ]

  const premiumPackageItems = [
    "analiza potrzeb inwestora",
    "układ funkcjonalny wnętrza z możliwościa czterech serii zmian",
    "zmiany w układzie ścian, jeśli są konieczne",
    "zestawienie produktów i kontrola budżetu",
    "wizualizacje 3D fotorealistyczne z możliwością dwóch serii zmian",
    "schemat elektryczny",
    "wytyczne wodno-kanalizacyjne",
    "projekt mebli na wymiar",
    "rzuty pomieszczeń 2D z wymiarami",
    "rzuty sufitów podwieszanych",
    "przekroje pomieszczeń 2D",
    "detale wymagające wytycznych",
    "przygotowanie wycen dla indywidualnych zamówień",
    "kontakt telefoniczny z wykonawcami",
    "kosztorys materiałów z upustem dla architektów",
    "konsultacje na każdym etapie projektu",
  ]


  return (
    <div className="h-full w-full">
      <Hero
        backgroundImageUrl="/images/oferta-glowne.jpg"
        leftElement={<p className="text-black text-6xl relative top-[-82px]">OFERTA</p>}
        rightElement={<div className="bg-amber-800 rounded-4xl w-1/3 text-center  relative top-[-82px] p-3">
          <p className="text-md text-white">
            UMÓW SIĘ NA BEZPŁATNĄ
            KONSULTACJE
          </p>
        </div>}
      />

      {/* Usługi section */}
      <div className="bg-amber-800 relative top-[-82px]" style={{ "borderRadius": "82px" }}>
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
      </div >


      {/* Projekty section */}
      <div className="">
        <div className="w-6/7 mx-auto gap-8 relative max-w-4xl">
          <div className="text-center text-black text-2xl mb-6 w-full border-2 border-black rounded-full p-1">KOMPLEKSOWY PROJEKT WNĘTRZA</div>
          <div className="flex flex-col mx-auto justify-center items-stretch gap-8">

            <div className="border-2 border-black rounded-4xl p-4 px-8 grid grid-cols-2 gap-8">
              <div className="flex flex-col justify-center gap-4 w-2/3 min-w-48 max-w-2xs">
                <div className="relative">
                  <h3 className="text-2xl">BASIC</h3>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-15 rounded-full bg-amber-800 border-2 border-black w-12 h-12`} />
                </div>
                <p className="text-amber-800">To idealna opcja dla osób,
                  które chcą zobaczyć pomysł
                  na aranżację i samodzielnie
                  zająć się realizacją.</p>
              </div>
              <div className="w-full min-w-48 max-w-md">
                <ul className="list-none flex flex-col gap-2">
                  {basicPackageItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-amber-800 rounded-full p-1.5 shrink-0 mt-0.5">
                        <Image src="/icons/wybor_czarny.png" alt="" width={16} height={16} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div >
            </div>

            <div className="border-2 border-black rounded-4xl p-4 px-8 grid grid-cols-2 gap-8">
              <div className="flex flex-col justify-center gap-4 w-2/3 min-w-48 max-w-2xs">
                <div className="relative">
                  <h3 className="text-2xl">KOMFORT</h3>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-15 rounded-full bg-amber-800 border-2 border-black w-12 h-12`} />
                </div>
                <p className="text-amber-800">Dzięki temu zakresowi
                  projekt można zrealizować
                  krok po kroku, dokładnie
                  tak, jak został zaplanowany.</p>
              </div>
              <div className="w-full min-w-48 max-w-md">
                <ul className="list-none flex flex-col gap-2">
                  {comfortPackageItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-amber-800 rounded-full p-1.5 shrink-0 mt-0.5">
                        <Image src="/icons/wybor_czarny.png" alt="" width={16} height={16} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div >
            </div>

            <div className="border-2 border-black rounded-4xl p-4 px-8 grid grid-cols-2 gap-8">
              <div className="flex flex-col justify-center gap-4 w-2/3 min-w-48 max-w-2xs">
                <div className="relative">
                  <h3 className="text-2xl">PREMIUM</h3>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-15 rounded-full bg-amber-800 border-2 border-black w-12 h-12`} />
                </div>
                <p className="text-amber-800">To rozwiązanie dla osób,
                  które potrzebują większej
                  elastyczności i doradztwa
                  przy jednocześnie
                  większych możliwościach i
                  dużym wyborze.</p>
              </div>
              <div className="w-full min-w-48 max-w-md">
                <ul className="list-none flex flex-col gap-2">
                  {premiumPackageItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-amber-800 rounded-full p-1.5 shrink-0 mt-0.5">
                        <Image src="/icons/wybor_czarny.png" alt="" width={16} height={16} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div >
            </div>

            <div className="text-center text-black text-2xl w-full border-2 border-black rounded-full p-1 bg-white relative my-12 mb-20">
              <p>WYCEŃ SWÓJ PROJEKT</p>
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-amber-800 border-4 border-black w-24 h-24 -z-10" />
            </div>


          </div>
        </div>
      </div>

      <Contact
        photoUrl="/images/oferta-kontakt.jpg"
        backgroundColor="bg-amber-800"
        logoUrl="/images/logo_czarne_skrocone.png"
        title="KONTAKT"
      />
    </div>
  );
}

