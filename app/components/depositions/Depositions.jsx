"use client"
import { useState, useEffect } from 'react';

const Depositions = ({ depositions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? depositions.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === depositions.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % depositions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [depositions.length]);

  return (
    <div className="relative flex justify-center pt-10 pb-10">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        &lt;
      </button>
      <div className="flex gap-2.5 items-center px-5 max-md:flex-wrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f1fe8b09732fb1dd577b372ce76f2daaefe654a0db3c7c2a2b3df6dc0d34ae?"
          className="shrink-0 self-stretch my-auto w-12 aspect-square"
        />
        {depositions[currentIndex] && (
          <img
            loading="lazy"
            src={`data:image/jpeg;base64,${depositions[currentIndex].imageDep}`}
            className="shrink-0 self-stretch my-auto max-w-full aspect-[0.74] w-[210px] h-[280px] rounded-full object-cover"
          />
        )}
        <div className="flex flex-col self-stretch max-md:max-w-full">
          <div className="self-start ml-3 text-4xl font-extrabold leading-10 text-center text-black max-md:max-w-full">
            DEPOIMENTOS DOS ALUNOS
          </div>
          <div className="flex gap-5 mt-20 text-xl leading-8 text-stone-400 max-md:flex-wrap max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eccec54b85373e583f5a92397a197b91fa21b9e4d073fb484382b1ccfba97dc?"
              className="shrink-0 aspect-[0.98] w-[60px]"
            />
            <div className="flex-auto max-md:max-w-full">
              {depositions[currentIndex]?.depoimento}
            </div>
          </div>
          <div className="mt-3.5 text-base italic leading-6 text-gray-500 max-md:max-w-full">
            — <span className="italic">{depositions[currentIndex]?.autorDepo}</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        &gt;
      </button>
    </div>
  );
};

export default Depositions;
