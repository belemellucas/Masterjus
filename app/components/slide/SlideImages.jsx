"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const SlideImages = ({ infoSite }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!infoSite || infoSite.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % infoSite[0].imageAnex.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [infoSite]); 

  useEffect(() => {
  }, [currentSlide]); 

  if (!infoSite || infoSite.length === 0) {
    return null; 
  }

  return (
    <div className="relative w-full h-96 md:h-[452px] overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-1000">
        {infoSite[0].imageAnex.map((base64String, imageIndex) => (
          <div
            key={imageIndex}
            className={`absolute inset-0 ${imageIndex === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={`data:image/jpeg;base64,${base64String}`}
              alt={`Image ${imageIndex}`}
              layout="fill"
              objectFit="cover" // Garante que a imagem cubra totalmente o espaço disponível
              className="w-full h-full" // Garante que a imagem ocupe todo o espaço do contêiner
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideImages;
