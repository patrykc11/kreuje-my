import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import { Project, getProjects } from "@/lib/projects";

// Force dynamic rendering to avoid including all images in build output
export const dynamic = 'force-dynamic';

async function fetchProjects(): Promise<Project[]> {
  // Try to fetch from API route first (for separation and smaller function size)
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: 'no-store',
    });
    
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching projects from API, falling back to direct call:', error);
  }
  
  // Fallback: use direct function call if API route fails
  // This ensures the page always works
  try {
    return await getProjects();
  } catch (error) {
    console.error('Error getting projects directly:', error);
    return [];
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

