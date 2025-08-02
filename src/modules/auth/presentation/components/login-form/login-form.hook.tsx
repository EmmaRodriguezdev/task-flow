"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

export type FormLoginType = z.infer<typeof loginSchema>;

export default function useLoginForm(defaultData?: FormLoginType) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.reset(defaultData);
    }
  }, [defaultData, form]);

  return {
    form,
  };
}
