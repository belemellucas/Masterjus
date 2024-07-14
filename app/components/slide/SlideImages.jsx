"use client";
import Image from "next/image";

const SlideImages = ({ infoSite }) => {
  return (
    <>
      <div>
        {infoSite?.length > 0 &&
          infoSite.map((info) => (
            <div
              key={info?.id}
              className="relative w-full h-[452px] overflow-hidden"
            >
              {info.imageAnex.map((base64String, index) => (
                <Image
                  key={index}
                  src={`data:image/jpeg;base64,${base64String}`}
                  alt={`Image ${index}`}
                  width={500}
                  height={500}
                  className="object-cover"
                />
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default SlideImages;
