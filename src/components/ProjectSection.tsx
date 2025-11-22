import Image from "next/image";
import { Project } from "@/lib/projects";

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  return (
    <div className="mb-16">
      {/* Project Title */}
      <div className="text-center mb-8">
        <div className="inline-block bg-white text-amber-800 rounded-full px-8 py-3 border-2 border-white">
          <h2 className="text-2xl font-semibold uppercase">{project.name}</h2>
        </div>
      </div>

      {/* Project Images - Capsule Layout */}
      <div className="overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-4 justify-center min-w-max">
          {project.images.map((image, index) => (
            <div
              key={index}
              className="shrink-0 relative group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="w-56 h-80 rounded-[3rem] overflow-hidden bg-white shadow-xl relative transition-all duration-300 group-hover:shadow-2xl group-hover:border-2 group-hover:border-amber-800">
                <Image
                  src={image.path}
                  alt={`${project.name} - ${image.filename}`}
                  width={224}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100%' }}
                  fill={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;

