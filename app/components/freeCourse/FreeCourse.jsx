import FreeCourseItem from "../freeCourseItem/FreeCouseItem"


const FreeCourse = ({ groupedCards }) => {
  const materials = groupedCards["Materiais Gratuitos"] || [];

  return (
    <div className="container flex flex-col items-center px-5">
      <div className="text-4xl font-extrabold text-center text-neutral-950 max-md:max-w-full">
        MATERIAIS GRATUITOS
      </div>
      <div className="self-stretch mt-14 w-full max-md:mt-10 max-md:max-w-full">
        <div className="justify-center flex gap-5 max-md:flex-col">
          {materials.map((material, index) => (
              <FreeCourseItem material={material} index={index}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeCourse;
