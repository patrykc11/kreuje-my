import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function OMnie() {
  return (
    <div className="border-2 border-amber-800  h-full w-full z-10">
      <Hero
        backgroundImageUrl="/images/o-mnie-glowne.jpg"
        leftElement={<p className="text-amber-800 text-6xl relative top-[-42px]">O MNIE</p>}
        rightElement={<></>}
        gradientOverlay="transparent"
        darkTheme={true}
      />

      {/* O mnie section */}
      <div className="bg-amber-800 relative top-[-42px]" style={{ "borderRadius": "82px" }}>
        <div className="py-12">
          <div className="flex items-start justify-center w-6/7 mx-auto gap-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-[1200px] h-1/2 border-3 border-black rounded-full"></div>
            <div className="border-2 border-amber-800 z-20 bg-white rounded-4xl p-4 text-center flex flex-col items-center justify-center w-1/3 min-w-48 max-w-2xs py-8 px-4 relative self-stretch">
              <p> Jestem Architektem Wnętrz z
                wykształcenia, ukończyłam
                studia licencjackie oraz
                magisterskie na Politechnice
                Śląskiej w Gliwicach. <br />
                Po latach pracy w biurach
                projektowych i
                architektonicznych, założenie
                własnej pracowni było
                naturalnym krokiem w moim
                rozwoju zawodowym.
                W sierpniu 2023 powstało
                miejsce, w którym mogę
                realizować projekty w zgodzie z
                moimi wartościami i szacunkiem
                do indywidualnych potrzeb
                każdego klienta.</p>
            </div>
            <div
              className="border-2 border-amber-800 z-20 bg-white rounded-4xl p-4 text-center flex flex-col items-center justify-center w-1/3 min-w-48 max-w-2xs py-8 px-4 relative self-stretch bg-cover bg-center"
              style={{ backgroundImage: "url('/images/o-mnie.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            </div>
            <div className="border-2 border-amber-800 z-20 bg-white rounded-4xl p-4 text-center flex flex-col items-center justify-center w-1/3 min-w-48 max-w-2xs py-8 px-4 relative self-stretch">
              <p> Projektowanie wnętrz to dla
                mnie coś więcej niż praca – to
                sposób na opowiadanie
                historii poprzez przestrzeń. <br />
                Każdy projekt tworzę z myślą
                o człowieku – o jego
                codzienności, potrzebach i
                emocjach.
                Współpracując ze mną,
                możesz liczyć na przemyślany
                proces, profesjonalne
                doradztwo iprojekt
                dopasowany do Ciebie w
                każdym detalu.</p>
            </div>
          </div>

          <div className="text-center text-black py-3">PAULINA KRASOWSKA-SZAFRUGA</div>
        </div>
      </div >

      <Contact
        photoUrl="/images/o-mnie-kontakt.jpg"
        backgroundColor="bg-white"
        logoUrl="/images/logo-biale-skrocone.png"
        title="KONTAKT"
      />
    </div >
  );
}

