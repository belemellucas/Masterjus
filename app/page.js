import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Initial from "./components/initial/Initial";
import Header from "./components/header/Header";
import Depositions from "./components/depositions/Depositions";

import Cards from "./cards/page";
import Blogs from "./components/blogs/Blogs";

export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);

  const prisma = new PrismaClient();

  const infoSite = await prisma.infoSite.findMany();

  const blogs = await prisma.blog.findMany();
    

  return (
    <>
      <Header />
      <Initial infoSite={infoSite} />
      <Cards searchParams={searchParams} />
      <Depositions infoSite={infoSite} />
      <Blogs blogs={blogs} />
    </>
  );
}
 