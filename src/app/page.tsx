'use client';

import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import PackageOptionCard from "@/components/PackageOptionCard";
import ConsultationButton from "@/components/ConsultationButton";
import ScrollSection from "@/components/ScrollSection";

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

const aboutCards = [
  {
    text: "Jestem Architektem Wnętrz z wykształcenia, ukończyłam studia licencjackie oraz magisterskie na Politechnice Śląskiej w Gliwicach.",
    image: "/images/studia.png",
    alt: "O mnie"
  },
  {
    text: "Po latach pracy w biurach projektowych i architektonicznych powstało miejsce, w którym mogę realizować projekty w zgodzie z moimi wartościami.",
    image: "/images/praca.png",
    alt: "O mnie"
  },
  {
    text: "Projektowanie wnętrz to dla mnie coś więcej niż praca – to sposób na opowiadanie historii poprzez przestrzeń.",
    image: "/images/hobby.png",
    alt: "O mnie"
  }
];

const trustReasons = [
  {
    title: "SPÓJNOŚĆ I FUNKCJONALNOŚĆ",
    description: "Każdy detal jest idealnie dopasowany do indywidualnych potrzeb a wszystkie rozwiązania są ergonomiczne."
  },
  {
    title: "DOPASOWANIE DO BUDŻETU I DECYZJE BEZ RYZYKA",
    description: "Budżet jest od początku do końca nadzorowany a przemyślany projekt elimunuje dodatkowe koszty."
  },
  {
    title: "WSPARCIE NA KAŻDYM ETAPIE",
    description: "Konsultacje od wyboru mieszkania, przez dobór materiałów i układ funkcjonalny po kontakt z wykonawcami."
  }
];

const cooperationStages = [
  {
    text: "Analiza potrzeb: podstawa projektu",
    isFilled: true
  },
  {
    text: "Ustalenie budżetu i wybór materiałów: kontrola wydatków od początku",
    isFilled: false
  },
  {
    text: "Koncepcja i wizualizacja 3D: zobacz swoje wnętrze",
    isFilled: false
  },
  {
    text: "Projekt wykonawczy: szczegóły dla wykonawców",
    isFilled: false
  }
];

export default function Home() {
  return (
    <div className="h-full w-full">
      <Hero
        backgroundImageUrl="/images/hero-main.jpg"
        minHeight="85vh"
        gradientOverlay="linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 7%, rgba(255,255,255,0) 15%)"
        contentWidth="w-full md:w-3/4"
        alignItems="stretch"
        rightElementHoverClass="transition-transform duration-300 hover:-translate-y-[5px]"
        leftElement={
          <div className="bg-white rounded-r-full pr-4 md:pr-8 pl-2 md:pl-3 relative flex items-center max-w-[50vw] md:max-w-[25vw] h-full -top-16 md:-top-20">
            <div className="absolute top-0 bottom-0 right-[99%] w-[200vw] bg-white" />
            <Image 
              src="/images/nazwa.png" 
              alt="Logo" 
              width={250} 
              height={60} 
              className="w-auto !h-14 md:!h-14 lg:!h-14 relative z-10 object-contain mt-0.5 md:mt-1" 
            />
          </div>
        }
        rightElement={
          <div className="bg-amber-800 rounded-full px-6 py-2 w-full md:w-[30vw] text-center flex items-center justify-center relative -top-16 md:-top-20">
            <h5 className="text-md text-white">
              Nie żyj po prostu w swoim wnętrzu - rozwijaj
              się w nim dzięki wyjątkowemu projektowi.
            </h5>
          </div>
        }
      />
      {/* Offer section */}
      <div className="bg-amber-800 relative z-10 -mt-[82px] rounded-t-[40px] md:rounded-t-[82px]">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full md:w-3/4 mx-auto py-24 md:px-8 max-md:p-12 gap-12 md:gap-0">
          <div className="py-2 pb-8 rounded-4xl text-white border-2 border-white w-full md:w-1/3 max-w-80 overflow-visible flex flex-col items-center justify-center hover-lift">
            <Link href="/oferta" className="relative group flex items-center justify-center mb-4">
              <h2 className="text-md text-center relative z-10">OFERTA</h2>
              <div className="absolute w-14 h-14 rounded-full border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </Link>
            <ul className="list-none text-sm w-[130%] max-w-96 text-center flex flex-col gap-6">
              {offerItems.map((item, index) => (
                <li key={index} className="bg-white text-black p-4 rounded-4xl hover-scale transition-transform duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md md:max-w-none md:w-[30vw] flex gap-4 items-center justify-center flex-col">
            <div className="px-4 py-2 rounded-4xl text-white border-1 border-white text-center w-full">
              <h2 className="text-md">KOMPLEKSOWY PROJEKT WNĘTRZA</h2>
            </div>
            {packageOptions.map((option, index) => (
              <ScrollSection key={index} animationType="fade-up" delay={200 + index * 100}>
                <PackageOptionCard
                  title={option.title}
                  description={option.description}
                />
              </ScrollSection>
            ))}
          </div>
        </div>
      </div>

      {/* About section */}
        <div className="bg-amber-800">
          <div className="bg-white p-12 max-md:p-6 rounded-t-[40px] md:rounded-t-[82px]">
            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-6/7 mx-auto py-24 max-md:py-12 gap-16 md:gap-0">
              {aboutCards.flatMap((card, index) => [
                <div
                  key={`card-${index}`}
                  className="group border-2 border-amber-800 z-20 bg-white rounded-4xl p-4 text-center flex flex-col items-center justify-between w-full md:w-1/5 min-w-48 pt-18 relative self-stretch max-w-xs md:max-w-none transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-amber-900"
                >
                  <div className="border-2 border-amber-800 bg-amber-800 z-10 rounded-full w-22 h-22 absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-900" />
                  <div className="border-2 border-amber-800 bg-white z-10 rounded-b-full w-22 h-11 absolute left-1/2 top-0 -translate-x-1/2 transition-all duration-300" />
                  {index === 1 && (
                    <Link href="/o-mnie" className="absolute left-1/2 -top-3 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-22 h-22">
                      <h2 className="text-white text-s relative z-10">O MNIE</h2>
                      <div className="absolute top-3 left-0 w-22 h-22 rounded-full border-2 border-transparent hover:border-black transition-colors duration-300" />
                    </Link>
                  )}
                  <p className="transition-colors duration-300 group-hover:text-amber-900">{card.text}</p>
                  <div className="my-4 w-30 h-30 flex items-center justify-center overflow-hidden mt-auto">
                    <Image src={card.image} alt={card.alt} width={150} height={150} className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>,
                ...(index < aboutCards.length - 1
                  ? [
                      <div key={`line-${index}`} className="relative hidden md:flex items-center z-10 w-16">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-800 -translate-y-1/2"></div>
                      </div>,
                    ]
                  : []),
              ])}
            </div>
          </div>
        </div>

      {/* Trust badge section */}
        <div className="bg-white">
          <div className="bg-amber-800 rounded-[40px] md:rounded-[82px]">
            <div className="w-full md:w-3/4 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-evenly py-24 md:px-8 max-md:p-12 gap-12 md:gap-8">
              {/* Left column - Why trust me */}
              <div className="w-full max-w-md flex flex-col gap-6">
                <ScrollSection animationType="fade-right" delay={0}>
                  <div className="border-2 border-white text-white rounded-4xl px-4 py-3 w-full max-w-80 mx-auto">
                    <h2 className="text-lg uppercase text-center">DLACZEGO WARTO MI ZAUFAĆ?</h2>
                  </div>
                </ScrollSection>
                <div className="flex flex-col gap-4">
                  {trustReasons.map((reason, index) => (
                    <ScrollSection key={index} animationType="fade-right" delay={100 + index * 100}>
                      <div className="bg-white border-2 border-amber-800 rounded-4xl p-6 relative w-full max-w-80 mx-auto">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-amber-800 rounded-full border-2 border-white"></div>
                        <h3 className="font-bold text-sm uppercase mb-2 ml-4">{reason.title}</h3>
                        <p className="text-sm ml-4">{reason.description}</p>
                      </div>
                    </ScrollSection>
                  ))}
                </div>
              </div>

              {/* Right column - Cooperation stages */}
              <div className="w-full max-w-md flex flex-col gap-6">
                <ScrollSection animationType="fade-left" delay={0}>
                  <div className="border-2 border-white text-white rounded-4xl px-4 py-3 w-full max-w-80 mx-auto">
                    <h2 className="text-lg uppercase text-center">ETAPY WSPÓŁPRACY</h2>
                  </div>
                </ScrollSection>
                <ScrollSection animationType="fade-left" delay={100}>
                  <div className="bg-white border-2 border-amber-800 rounded-4xl p-8 relative hover-lift">
                    <div className="absolute top-13 bottom-8 w-1 bg-amber-800 -translate-x-1/2 z-0"></div>
                    <div className="flex flex-col gap-8 relative">
                      {cooperationStages.map((stage, index) => (
                        <div key={index} className="relative flex items-center min-h-[60px] group">
                          <div className={`absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-amber-800 ${stage.isFilled ? 'bg-amber-800' : 'bg-white'} z-10 transition-all duration-300 group-hover:scale-110`}></div>
                          <p className="text-sm mr-auto pl-12 text-left w-3/4 transition-colors duration-300 group-hover:text-amber-800">{stage.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollSection>
                <ScrollSection animationType="scale" delay={400}>
                  <div className="w-full max-w-2xl mx-auto mt-12 flex justify-center">
                    <ConsultationButton />
                  </div>
                </ScrollSection>
              </div>
            </div>
          </div>
        </div>

      {/* Contact section */}
        <Contact
          photoUrl="/images/glowna-kontakt.jpg"
          backgroundColor="bg-white"
          logoUrl="/images/logo_czarne_skrocone.png"
          title="KONTAKT"
        />
    </div >
  );
}
