import Image from "next/image";
import { Button } from "../ui/button";

export default function LandingPage() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-16 h-[100%] max-w-full">
      <section className="w-full flex flex-col lg:flex-row gap-[20px] justify-center items-center h-[calc(100dvh-10dvh)]">
        <article className="flex flex-col gap-[40px] w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-[5rem] leading-tight lg:leading-[6rem] font-extrabold text-wrap">
            Gestioná tus tareas con{" "}
            <span className="text-4xl sm:text-5xl lg:text-[5.5rem] text-yellow border-b-[5px] border-yellow rounded-[10px]">
              IA
            </span>{" "}
            ,{" "}
            <span className="text-4xl sm:text-5xl lg:text-[5.5rem] text-yellow border-b-[5px] border-yellow rounded-[10px]">
              rápido
            </span>{" "}
            y sin complicaciones.
          </h1>
          <p className="text-lg sm:text-xl lg:text-[1.5rem] font-medium text-wrap">
            Un espacio de trabajo donde tu y tu equipo puedan colaborar, sin
            caos ni correos eternos.
          </p>
          <Button variant="yellow" className="w-min">
            Probar gratis
          </Button>
        </article>
        <div className="w-full">
          <Image
            src="/images/management.webp"
            alt="presentacion"
            width={100}
            height={100}
            className="h-auto w-full"
          />
        </div>
      </section>
      <section className="h-[100dvh] flex flex-col gap-[20px] justify-center items-center bg-black">
        <h1>This is other section</h1>
      </section>
    </div>
  );
}
