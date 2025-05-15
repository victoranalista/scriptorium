"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { UserFormSchema, UserFormData } from "../validation";
import { criarOuAtualizarUsuarioAction } from "../actions";
import { User, UserProfile, UserActionState } from "../types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"; // Para o campo 'ativo'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect } from "react";

export const initialState: UserActionState = {
  message: "",
  status: "error",
  errors: null,
  data: null,
};

const perfisOpcoes: { value: UserProfile; label: string }[] = [
  { value: "Escrevente", label: "Escrevente" },
  { value: "Oficial", label: "Oficial" },
  { value: "Admin", label: "Administrador do Sistema" },
];

interface UserFormProps {
  user?: User | null;
  onFormSubmit?: (user?: User) => void;
}

export function UserForm({ user, onFormSubmit }: UserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      nomeCompleto: user?.nomeCompleto || "",
      email: user?.email || "",
      perfil: user?.perfil || "Escrevente",
      ativo: user?.ativo === undefined ? true : user.ativo, 
      senha: "", 
    },
  });

  const [state, formAction] = useFormState(criarOuAtualizarUsuarioAction, initialState);

  useEffect(() => {
    if (state?.status === "success" && state.message) {
      form.reset({
        nomeCompleto: "",
        email: "",
        perfil: "Escrevente",
        ativo: true,
        senha: "",
      });
      if (onFormSubmit) {
        onFormSubmit(state.data || undefined);
      }
    }
    if (state?.status === "error" && state.message && state.errors) {
        // Focar no primeiro campo com erro, se possível
        const fieldErrors = state.errors;
        if (fieldErrors) {
            const firstErrorField = Object.keys(fieldErrors)[0] as keyof UserFormData | undefined;
            if (firstErrorField) {
                form.setFocus(firstErrorField);
            }
        }
    }
  }, [state, form, onFormSubmit]);

  // Se estiver editando, popular o formulário com os dados do usuário
  useEffect(() => {
    if (user) {
      form.reset({
        nomeCompleto: user.nomeCompleto,
        email: user.email,
        perfil: user.perfil,
        ativo: user.ativo,
        senha: "", // Senha não é populada para edição por segurança
      });
    }
  }, [user, form]);

  return (
    <Card className="w-full bg-card text-card-foreground border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {user ? "Editar Usuário" : "Criar Novo Usuário"}
        </CardTitle>
        {!user && (
          <CardDescription>
            Preencha os dados para adicionar um novo funcionário.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            {user && <input type="hidden" name="id" value={user.id} />}
            <FormField
              control={form.control}
              name="nomeCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome completo do funcionário"
                      {...field}
                      className="bg-input"
                    />
                  </FormControl>
                  <FormMessage>{state?.errors?.nomeCompleto?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@cartorio.com"
                      {...field}
                      className="bg-input"
                    />
                  </FormControl>
                  <FormMessage>{state?.errors?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="perfil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil de Acesso</FormLabel>
                  <FormControl>
                    <Select
                      name="perfil"
                      value={field.value || "Escrevente"} // nunca vazio
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Selecione o perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        {perfisOpcoes.map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage>{state?.errors?.perfil?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {user ? "Nova Senha (Opcional)" : "Senha"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        user
                          ? "Deixe em branco para não alterar"
                          : "Crie uma senha forte"
                      }
                      {...field}
                      className="bg-input"
                    />
                  </FormControl>
                  <FormDescription>
                    {user
                      ? "Preencha apenas se desejar alterar a senha."
                      : "Mínimo 8 caracteres."}
                  </FormDescription>
                  <FormMessage>{state?.errors?.senha?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3 shadow-sm bg-input">
                  <div className="space-y-0.5">
                    <FormLabel>Usuário Ativo</FormLabel>
                    <FormDescription>
                      Usuários inativos não podem acessar o sistema.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {state?.message && (
              <p
                className={`${
                  state.status === "success" ? "text-green-500" : "text-red-500"
                } text-sm mt-2 font-medium`}
              >
                {state.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {user ? "Salvar Alterações" : "Criar Usuário"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

