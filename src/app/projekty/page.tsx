import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import { Project } from "@/lib/projects";

// Force dynamic rendering to avoid including all images in build output
export const dynamic = 'force-dynamic';

async function fetchProjects(): Promise<Project[]> {
  // Construct base URL for API call
  // In Vercel, use VERCEL_URL or construct from request
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export default async function Projekty() {
  const projects = await fetchProjects();

  return (
    <div className="h-full w-full">
      <Hero
        backgroundImageUrl="/images/projekty-glowne.jpg"
        leftElement={<h1 className="text-white text-6xl relative top-[-82px]">PROJEKTY</h1>}
        rightElement={<></>}
        gradientOverlay="transparent"
        darkTheme={true}
      />

      {/* Projekty section */}
      <div className="bg-amber-800 relative top-[-82px]" style={{ "borderRadius": "82px" }}>
        <div className="py-24 max-md:py-12">
          <div className="w-6/7 mx-auto max-w-7xl px-4">
            {projects.map((project, index) => (
              <ProjectSection key={index} project={project} />
            ))}
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

