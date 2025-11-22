interface PackageOptionCardProps {
  title: string;
  description: string;
  backgroundColor?: string;
  circleColor?: string;
  borderColor?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const PackageOptionCard = ({
  title,
  description,
  backgroundColor = "bg-white",
  circleColor = "bg-amber-800",
  borderColor = "border-white",
  titleClassName = "text-lg mb-4",
  descriptionClassName = "text-sm"
}: PackageOptionCardProps) => {
  return (
    <div className={`${backgroundColor} rounded-4xl p-5 px-8 relative h-full flex flex-col hover-lift transition-all duration-300`}>
      <h3 className={`${titleClassName} transition-colors duration-300 group-hover:text-amber-800`}>{title}</h3>
      <p className={`${descriptionClassName} grow`}>{description}</p>
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full ${circleColor} border-2 ${borderColor} w-12 h-12 transition-transform duration-300 hover:scale-110`} />
    </div>
  );
};

export default PackageOptionCard;

