"use client";
import Link from "next/link";
import LoginForm from "./components/form";
import useLoginForm from "@/modules/auth/presentation/components/login-form/login-form.hook";
export default function LoginPage() {
  const { form } = useLoginForm();
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-20">
      <div>
        <h1 className="text-white font-semibold text-[30px]/[10px]">
          TASKFLOW
        </h1>
      </div>
      <div className="flex justify-center items-center bg-white-blue w-[50%] h-[500px] rounded-lg">
        <section className="flex flex-col gap-4">
          <h1 className="text-[22px] text-center">
            Inicia sesión con tu correo electronico y contraseña
          </h1>
          <LoginForm form={form} />
          <section>
            <p>
              No tienes una cuenta?{" "}
              <Link className="underline text-medium text-center" href="signup">
                Registrate aquí
              </Link>
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
