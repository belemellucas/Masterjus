import { PrismaClient } from "@prisma/client";
import BlogItem from "../components/BlogItem";
import Search from "../components/Search";
import { fetchCategory } from "@/actions/actions";
import Image from "next/image";
import Card from "../components/course/Course";
import Course from "../components/course/Course";

const prisma = new PrismaClient();

const Courses = async ({ searchParams }) => {
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
    <Course groupedCards={groupedCards} />
  );
};

export default Courses;
