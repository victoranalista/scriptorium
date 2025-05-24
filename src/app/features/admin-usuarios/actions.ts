"use server";
import { revalidatePath } from "next/cache";
import { adminUsuariosService } from "./services";
import { User, UserActionState } from "./types";
import { UserFormData, UserFormSchema } from "./validation";

export async function criarOuAtualizarUsuarioAction(
  prevState: UserActionState | null,
  formData: FormData
): Promise<UserActionState> {
  console.log("Server Action: criarOuAtualizarUsuarioAction chamada");

  const id = formData.get("id") as string | null;

  const rawFormData = {
    nomeCompleto: formData.get("nomeCompleto"),
    email: formData.get("email"),
    perfil: formData.get("perfil"),
    ativo: formData.get("ativo") === "on" || formData.get("ativo") === "true", // Checkbox pode vir como 'on'
    senha: formData.get("senha") || undefined,
  };

  console.log(`Dados brutos do FormData (${id ? 'Atualizar' : 'Criar'} Usuário):`, JSON.stringify(rawFormData, null, 2));

  // Se for atualização e a senha não foi fornecida, removemos para não validar/atualizar em branco
  if (id && !rawFormData.senha) {
    delete (rawFormData as Partial<UserFormData>).senha;
  }

  const validationResult = UserFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action (Usuário):", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors as any,
      data: null,
    };
  }

  try {
    let resultUsuario: User | null = null;
    let actionMessage = "";

    if (id) {
      console.log(`Dados validados (Atualizar Usuário ${id}), chamando o serviço:`, validationResult.data);
      resultUsuario = await adminUsuariosService.atualizarUsuario(id, validationResult.data as UserFormData);
      actionMessage = "Usuário atualizado com sucesso!";
    } else {
      console.log("Dados validados (Criar Usuário), chamando o serviço:", validationResult.data);
      // Para criação, a senha é obrigatória no schema se não for opcional, ajuste o schema ou a lógica aqui.
      // Se a senha for opcional na criação (ex: gerada automaticamente), o schema UserFormSchema precisa refletir isso.
      // Assumindo que para criação a senha é obrigatória se fornecida, ou pode ser opcional.
      if (!validationResult.data.senha && !id) {
        // Lógica para gerar senha ou retornar erro se for mandatório na criação
        // Por ora, o schema permite senha opcional, então prossegue.
      }
      resultUsuario = await adminUsuariosService.criarUsuario(validationResult.data as UserFormData);
actionMessage = "Usuário criado com sucesso!";
    }
    
    console.log("Resultado do serviço (Usuário):", resultUsuario);
    if (resultUsuario) {
        revalidatePath("/admin/usuarios"); // Para atualizar a lista de usuários na página
        return {
            message: actionMessage,
            status: "success",
            data: resultUsuario,
            errors: null,
        };
    } else {
        return {
            message: `Falha ao ${id ? 'atualizar' : 'criar'} usuário.`,
            status: "error",
            data: null,
            errors: null, // Pode adicionar erros específicos do serviço aqui se houver
        };
    }

  } catch (error: any) {
    console.error(`Erro ao ${id ? 'atualizar' : 'criar'} usuário no serviço:`, error);
    return {
      message: error.message || `Ocorreu um erro ao processar o ${id ? 'atualização' : 'criação'} do usuário.`,
      status: "error",
      errors: null,
      data: null,
    };
  }
}

export async function deletarUsuarioAction(id: string): Promise<Omit<UserActionState, "data">> {
    try {
        const deletado = await adminUsuariosService.deletarUsuario(id);
        if (deletado) {
            revalidatePath("/admin/usuarios");
            return {
                message: `Usuário ${id} deletado com sucesso.`,
                status: "success",
                errors: null,
            };
        }
        return {
            message: `Usuário ${id} não encontrado ou já deletado.`,
            status: "error",
            errors: null,
        };
    } catch (error: any) {
        return {
            message: error.message || "Erro ao deletar usuário.",
            status: "error",
            errors: null,
        };
    }
}

