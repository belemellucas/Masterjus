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


export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);

  const prisma = new PrismaClient();

  const infoSite = await prisma.infoSite.findMany();

  const blogs = await prisma.blog.findMany();
    

  return (
    <>
      <Initial infoSite={infoSite} />
      <Cards searchParams={searchParams} />
      <Depositions infoSite={infoSite} />
      <Blogs blogs={blogs} />
      <VideoComponent infoSite={infoSite} />
      <Depositions depositions={depositions} />
      
    </>
  );
}
 