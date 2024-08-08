import { fetchCategory } from "@/actions/actions";
import Header from "../components/header/Header"




const HeaderInitial = async () => {
  
   const categoriesData = await fetchCategory();
   console.log(categoriesData)
    return (
      
     <Header />
    );
  };
  
  export default HeaderInitial;
  