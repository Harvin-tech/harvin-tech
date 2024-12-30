import Image from "next/image";

const IoTCard = ({ imageSrc, title }: { imageSrc: string; title: string }) => {
  return (
    <div className="flex flex-col items-center p-2 shadow-md rounded-lg bg-white max-w-lg">
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
      <Image fill src={imageSrc} alt={title} className="absolute object-cover" />

      </div>
      <p className="mt-2 text-sm font-semibold text-gray-800">{title}</p>
    </div>
  );
};

export default IoTCard;
