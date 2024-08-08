import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
//import { authOptions } from "./api/auth/[...nextauth]/route";
import { authOptions } from "@/app/utils/authOptions"

import Initial from "./components/initial/Initial";
import Header from "./components/header/Header";
import Depositions from "./components/depositions/Depositions";
import VideoComponent from "./components/video/VideoComponent";
import Cards from "./courses/page";
import Footer from "./components/footer/Footer";
import Blogs from "./blog/page";
// import Blogs from "./components/blogs/Blogs";


export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);

  const prisma = new PrismaClient();

  const infoSite = await prisma.infoSite.findMany();

  const depositions = await prisma.depoimento.findMany();
  
  const blogs = await prisma.blog.findMany();
  console.log(infoSite)
  return (
    <>
      <Initial infoSite={infoSite} />
      <Cards searchParams={searchParams} />
      <VideoComponent infoSite={infoSite} />
      <Depositions depositions={depositions} />
      {/* <Blogs searchParams={searchParams} /> */}
    </>
  );
}
 