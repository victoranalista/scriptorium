import { z } from "zod";
import { UserProfile } from "./types";

const perfisValidos: [UserProfile, ...UserProfile[]] = [
  "Escrevente",
  "Oficial",
  "Admin"
];

export const UserFormSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome completo é obrigatório (mínimo 3 caracteres)."),
  email: z.string().email("Email inválido."),
  perfil: z.enum(perfisValidos, {
    errorMap: () => ({ message: "Perfil de usuário inválido." }),
  }),
  ativo: z.boolean(),
  // Senha é opcional no formulário (pode ser para edição sem alterar senha,
  // ou para criação onde a senha é gerada/enviada de outra forma inicialmente)
  // Se presente, deve ter requisitos mínimos.
  senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres.").optional().or(z.literal("")),
});

export type UserFormData = z.infer<typeof UserFormSchema>;

