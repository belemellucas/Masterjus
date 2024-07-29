import Image from "next/image";
import Link from "next/link";

const FreeCourseItem = ({ material, index }) => { 
    const { id } = material || {}
  return (
    <div
      key={index}
      className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full pb-10"
    >
      <div className="flex flex-col grow text-center max-md:mt-8">
        <Link href={`/freeCourse/${id}`}>
          {material.imageCard ? (
            <div className="relative w-full h-[260px] mb-4 rounded-md overflow-hidden">
              <Image
                src={`data:image/jpeg;base64,${material.imageCard}`}
                alt={`Image ${material.imageCard}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          ) : null}
        </Link>
        <div className="sub-title mt-5 text-lg font-light text-blue-800 line-clamp-3">
          {material.subCurso}
        </div>
        <div className="info mt-3.5 h-14 text-lg font-medium leading-5 text-neutral-950 overflow-hidden overflow-ellipsis">
          {material.infoCard}
        </div>
        <div className="description mt-6 h-20 text-lg font-medium text-neutral-950 overflow-hidden overflow-ellipsis">
          {material.DescCurso}
        </div>
      </div>
      <div className="flex flex-col items-center mt-6 font-semibold text-center text-neutral-950 max-md:mt-10">
        <div className="text-3xl mb-4">GRATUITO</div>
        <div className="text-xs mb-4">SAIBA MAIS</div>
        <a href={material.linkCurso} target="_blank" rel="noopener noreferrer">
          <div className="px-14 py-4 text-base text-white whitespace-nowrap bg-blue-800 rounded-[30px] max-md:px-5">
            INSCREVA-SE
          </div>
        </a>
      </div>
    </div>
  );
};

export default FreeCourseItem;
