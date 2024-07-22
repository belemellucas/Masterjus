import CategoryItems from '@/app/components/categoryItems/CategoryItems'
import { fetchCardsByCategory } from "@/actions/actions";

const CategoryPage = async ({ params }) => {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category).trim();
  const groupedCards = await fetchCardsByCategory(category);
   return (
    <div>
      <CategoryItems category={decodedCategory} groupedCards={groupedCards} /> 
    </div>
  );
};

export default CategoryPage;
