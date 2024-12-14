const IoTCard = ({ imageSrc, title }: { imageSrc: string; title: string }) => {
  return (
    <div className="flex flex-col items-center p-4 shadow-md rounded-lg bg-white">
      <img src={imageSrc} alt={title} className="w-20 h-20 object-contain" />
      <p className="mt-2 text-sm font-semibold text-gray-800">{title}</p>
    </div>
  );
};

export default IoTCard;
