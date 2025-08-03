'use client'
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import sonner from "@/lib/sonner";
import { SonnerType } from "@/core/types/enums";

type UserCredentials = {
  email: string;
  password: string;
};
export default function useLoginHook() {
  const router = useRouter();
  const sigin = useMutation({
    mutationFn: async (values: UserCredentials) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password
      });
      console.log(result)
      if (!result?.ok) {
        sonner(result?.error || 'Error', SonnerType.ERROR)
      } else {
        router.push("/panel");
      }
    },
  });
  return {
    sigin,
  };
}
