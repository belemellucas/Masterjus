import { PrismaClient } from "@prisma/client";
import BlogItem from "../components/BlogItem";
import Search from "../components/Search";
import CardItem from "../components/CourseItem";
import { fetchCategory } from "@/actions/actions";
import Image from "next/image";

const prisma = new PrismaClient();

const Cards = async ({ searchParams }) => {
  const query = searchParams?.query;

  // Função para buscar categorias e cartões
  const fetchCards = async () => {
    const cards = await prisma.cards.findMany({
      include: { categoria: true }, // Inclui os dados da categoria relacionada
      where: query
        ? {
            OR: [{ infoCard: { contains: query } }],
          }
        : {},
    });

    const categoriesData = await fetchCategory();

    // Inicializar groupedCards com todas as categorias e cartões vazios
    const groupedCards = {};
    categoriesData.forEach((category) => {
      groupedCards[category.NomeCat] = [];
    });

    // Mapear cartões para categorias correspondentes
    cards.forEach((card) => {
      const categoryName = card.categoria?.NomeCat || "Sem Categoria";
      if (groupedCards[categoryName]) {
        groupedCards[categoryName].push(card);
      }
    });

    return groupedCards;
  };

  // Renderizar as categorias e cartões após a resolução da promessa
  const groupedCards = await fetchCards();

  return (
    <div className="px-4 md:px-16 pb-6 mt-14 mx-auto bg-zinc-100 min-h-screen">
      <div className="flex">
        <div className="flex flex-col justify-start items-center md:items-start w-full max-md:px-5 max-md:mt-10">
          {Object.entries(groupedCards).map(
            ([categoryName, cardsInCategory]) => {
              if (cardsInCategory.length > 0) {
                return (
                  <div
                    key={categoryName}
                    className="w-full mb-6 flex flex-col items-center sm:flex-row sm:flex-col sm:items-start"
                  >
                    <div className="relative w-full max-w-[278.2px] h-[50px] bg-[#F1F1F1] whitespace-nowrap max-md:whitespace-normal">
                      <div className="absolute w-full max-w-[262.2px] h-[50px] left-0 top-0 bg-[#200140] rounded-[7px] flex items-center justify-center">
                        <span
                          className="w-full max-w-[230.58px] h-[42px] font-poppins font-bold text-[20px] md:text-[24px] leading-[30px] md:leading-[36px] text-center text-white flex items-center"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {categoryName}
                        </span>
                      </div>
                    </div>
                    {cardsInCategory.length > 0 ? (
                      <div className="mt-4">
                        {cardsInCategory.map((card) => (
                          <CardItem key={card.id} card={card} />
                        ))}
                      </div>
                    ) : (
                      <p className="ml-12 mt-4">Nenhum item nesta categoria.</p>
                    )}
                  </div>
                );
              }
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
