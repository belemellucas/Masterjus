import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Initial from "./components/initial/Initial";
import Header from "./components/header/Header";
import Cards from "./cards/page";

export default async function Home({ searchParams }) {

  const session = await getServerSession(authOptions);

  /*if (!session) {
    redirect('/auth/login');
  } */
   
  return (
    <>
     {/* <h2>Home Page logged in User {session?.user?.username}</h2>  
       <LogoutButton label={'Logout'} /> */}
      <Header />
      <Initial />
      <Cards searchParams={searchParams}/>
   </>
  )
} 