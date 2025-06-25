import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-2 left-2 right-2 h-16 bg-blue-dark rounded-[8px]">
      <div className="flex justify-between items-center px-4 h-full w-[80dvw] mx-auto">
        <Image
          src="/images/logo-tf-wbg.webp"
          alt="logo_tasksflow"
          width={100}
          height={100}
          className="h-auto w-60 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex items-center gap-[100px] justify-between">
          <nav>
            <ul className="flex justify-between items-center gap-10 text-white font-semibold text-[1rem]">
              <li>
                <a className="decoration-none hover:underline hover:text-red-intense duration-200 transition-colors cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a className="decoration-none hover:underline hover:text-red-intense duration-200 transition-colors cursor-pointer">
                  Pricings
                </a>
              </li>
              <li>
                <a className="decoration-none hover:underline hover:text-red-intense duration-200 transition-colors cursor-pointer">
                  Signin
                </a>
              </li>
              <li>
                <a className="decoration-none hover:underline hover:text-red-intense duration-200 transition-colors cursor-pointer">
                  How it works
                </a>
              </li>
            </ul>
          </nav>
          <button className="text-white">
            <MdMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
