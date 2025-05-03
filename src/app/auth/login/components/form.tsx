import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLoginType } from "@/modules/auth/presentation/components/login-form/login-form.hook";
import { UseFormReturn } from "react-hook-form";
import useLoginHook from "@/modules/auth/presentation/hooks/login.hook";

export default function LoginForm(props: {
  form: UseFormReturn<FormLoginType>;
}) {
  const { form } = props;
  const {
    sigin: { mutateAsync, isPending },
  } = useLoginHook();
  const onSubmit = async (values: FormLoginType) => {
    console.log(values);
    mutateAsync(values);
  };
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Correo Electronico
              <span className="text-yellow font-bold text-[20px]">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="example@taskflow.com" {...field} />
            </FormControl>
            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Contraseña
              <span className="text-yellow font-bold text-[20px]">*</span>
            </FormLabel>
            <FormControl>
              <Input type="password" placeholder="********" {...field} />
            </FormControl>
            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-2">
        <Button
          disabled={isPending}
          type="submit"
          variant="yellow"
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending ? "Iniciando Sesión" : "Iniciar Sesión"}
        </Button>
        <Button type="button">Regresar al inicio</Button>
      </div>
    </Form>
  );
}
