"use client";
import Link from "next/link";
import LoginForm from "./components/form";
import useLoginForm from "@/modules/auth/presentation/components/login-form/login-form.hook";
import Image from "next/image";
export default function LoginPage() {
  const { form } = useLoginForm();
  return (
    <div className="relative flex flex-col justify-center items-center h-screen space-y-20">
      <div>
        <Image
          src="/images/logo-tf-wbg.webp"
          alt="logo"
          width={100}
          height={100}
          className="w-[300px] h-[300px] absolute top-2 left-[50%] translate-x-[-50%]"
        />
      </div>
      <div className="flex justify-center items-center bg-black text-white border border-blue-dark w-[50%] h-[500px] rounded-lg">
        <section className="flex flex-col gap-4">
          <h1 className="text-[22px] text-center">
            Inicia sesión con tu correo electronico y contraseña
          </h1>
          <LoginForm form={form} />
          <section>
            <p>
              No tienes una cuenta?{" "}
              <Link
                className="underline text-medium text-center text-yellow"
                href="signup"
              >
                Registrate aquí
              </Link>
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
