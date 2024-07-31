"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const SlideImages = ({ infoSite }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Atualiza isDesktop e images ao montar o componente
    updateIsDesktop();

    if (infoSite && infoSite[0]) {
      const selectedImages = window.innerWidth >= 768
        ? infoSite[0]?.imageAnex || []
        : infoSite[0]?.imageMob || [];
      setImages(selectedImages);
    }

    // Adiciona um event listener para atualizar isDesktop ao redimensionar a janela
    window.addEventListener('resize', updateIsDesktop);

    // Limpa o event listener ao desmontar o componente
    return () => window.removeEventListener('resize', updateIsDesktop);
  }, [infoSite]);

  useEffect(() => {
    if (infoSite && infoSite[0]) {
      const selectedImages = isDesktop
        ? infoSite[0]?.imageAnex || []
        : infoSite[0]?.imageMob || [];
      setImages(selectedImages);
    }
  }, [isDesktop, infoSite]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  if (!infoSite || !infoSite[0]) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!infoSite || infoSite.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-96 md:h-[452px] overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-1000">
        {images.map((base64String, imageIndex) => (
          <div
            key={imageIndex}
            className={`absolute inset-0 ${
              imageIndex === currentSlide ? "opacity-100" : "opacity-0"
            }`}
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
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        &gt;
      </button>
    </div>
  );
};

export default SlideImages;
