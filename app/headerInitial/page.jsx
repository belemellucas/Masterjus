import { fetchCategory } from "@/actions/actions";
import Header from "../components/header/Header";

const HeaderInitial = async () => {
  const categoriesData = await fetchCategory();
  return <Header categoriesData={categoriesData} />;
};

export default HeaderInitial;