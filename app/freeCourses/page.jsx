import { PrismaClient } from "@prisma/client";
import { fetchCategory } from "@/actions/actions";
import Course from "../components/course/Course";
import FreeCourse from "../components/freeCourse/FreeCourse";

const prisma = new PrismaClient();

const FreeCourses = async ({ searchParams }) => {
  const query = searchParams?.query;

// Função para buscar categorias e cartões
  const fetchCards = async () => {
    const cards = await prisma.cards.findMany();

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
    <FreeCourse groupedCards={groupedCards} />
  );
};

export default FreeCourses;