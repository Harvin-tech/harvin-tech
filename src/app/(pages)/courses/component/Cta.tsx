const Cta = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className=" w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg p-6">
        <h1 className="text-sm font-bold">
          skill<span className="text-yellow-300">IQ</span>
        </h1>
        <h2 className="text-2xl font-bold mt-2">Not sure where to start?</h2>
        <p className="mt-2 text-sm">
          Know exactly where everyone on your team stands with the skills you
          care about most
        </p>
        <button className="mt-4 px-4 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-500">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Cta;
