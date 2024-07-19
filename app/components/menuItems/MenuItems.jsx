import Image from "next/image";
import Link from "next/link";

function MenuItems() {
  const menuOptions = [
    { name: "Home" },
    { name: "Cursos" },
    { name: "PrevEvolution" },
    { name: "Mat. Gratuitos" },
    { name: "BLOG" },
    { name: "Livros/e-books" },
    { name: "Fale Conosco" },
  ];
  return (
    <div className="flex gap-5 justify-between items-start w-full max-w-[1160px] max-md:flex-wrap max-md:max-w-full">
      <Image
        loading="lazy"
        src="/logo/logo-master.png"
        alt="Logo"
        width={200}
        height={50}
      />
      <div className="flex flex-wrap max-w-[800px] text-sm font-semibold tracking-wider leading-5 uppercase text-neutral-700">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {menuOptions.map((option, index) => (
            <li key={index} className="flex-shrink-0 mr-4">
              {option.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 self-stretch my-auto mt-2">
        <Link href="/registerUser" passHref>
          <Image
            loading="lazy"
            src="/icones/carrinho.svg"
            alt="Icone Carrinho"
            width={19}
            height={19}
          />
        </Link>

        <Link href="/registerUser" passHref>
          <Image
            loading="lazy"
            src="/icones/user.svg"
            alt="Icone Usuário"
            width={19}
            height={19}
          />
        </Link>
      </div>
    </div>
  );
}

export default MenuItems;
