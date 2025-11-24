import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";

export default function Projekty() {
  return (
    <div className="h-full w-full">
      <Hero
        backgroundImageUrl="/images/projekty-glowne.jpg"
        leftElement={<h1 className="text-white text-4xl md:text-6xl relative top-[-82px]">PROJEKTY</h1>}
        rightElement={<></>}
        gradientOverlay="transparent"
        darkTheme={true}
      />

      {/* Projekty section */}
      <div className="bg-amber-800 relative top-[-82px]" style={{ "borderRadius": "82px" }}>
        <div className="py-24 max-md:py-12">
          <div className="w-6/7 mx-auto max-w-7xl px-4">
            <ProjectsList />
          </div>
        </div>
      </div>

      <Contact
        photoUrl="/images/projekty-kontakt.jpg"
        backgroundColor="bg-white"
        logoUrl="/images/logo_czarne_skrocone.png"
        title="KONTAKT"
      />
    </div>
  );
}

