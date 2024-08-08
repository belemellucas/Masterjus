import { fetchSingleCourse } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";

const FreeCourseDetail = async ({ params }) => {
  const id = params?.id;

  const course = await fetchSingleCourse(id);
  return (
    <></>
    // <div className="flex flex-col pb-10">
    //   <div
    //     className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-3 w-full text-center text-white min-h-[350px] max-md:px-5 max-md:max-w-full"
    //     style={{
    //       backgroundImage:
    //         "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://www.masterjus.com.br/imagemsite/38/PoS-PLANEJAMENTO-PREV.png)",
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //     }}
    //   >
    //     <div className="flex relative flex-col items-center w-full max-w-[1649px] max-md:max-w-full">
    //       <div className="self-stretch text-3xl font-medium leading-10 max-md:max-w-full">
    //         {course.infoCard}
    //       </div>
    //       <div className="self-stretch mx-6 mt-14 text-3xl font-light leading-10 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
    //         {course.subCurso}
    //       </div>
    //       <div className="flex gap-1 mt-11 max-md:mt-10">
    //         <div className="grow text-base leading-6">
    //           De <span className="line-through">R$ {course.valorAnt}</span> por{" "}
    //         </div>
    //         <div className="text-xl leading-8">R$ {course.valorAtual}</div>
    //       </div>
    //       <div className="mt-2 text-base leading-6">
    //         ou 12 x R$ {(course.valorAtual / course.numParcela).toFixed(2)}
    //       </div>
    //       <Link href={course.linkCurso} passHref>
    //         <div className="flex gap-3 justify-center px-10 py-3.5 mt-6 text-base leading-6 whitespace-nowrap bg-blue-800 rounded-xl max-md:px-5 cursor-pointer">
    //           <img
    //             loading="lazy"
    //             src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d385240edbd6cbd65b40ca89a183f6ef24732315add13c27f6f470eb964240a?"
    //             className="shrink-0 self-start w-5 aspect-[1.11]"
    //           />
    //           <div className="flex-auto">MATRICULE-SE</div>
    //         </div>
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="flex flex-col self-center px-5 mt-14 text-base font-bold leading-6 text-neutral-800 max-w-[1200px] max-md:mt-10 max-md:max-w-full">
    //     <div className="self-start mt-5 leading-[150%] max-md:max-w-full">
    //       {course.DescCurso}
    //     </div>
    //   </div>
    // </div>
  );
};

export default FreeCourseDetail;
