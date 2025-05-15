"use server";

import { AgendamentoSchema, AgendamentoFormData } from "./validation";
import { agendamentoService } from "./services";
import { AgendamentoActionState, Agendamento } from "./types";
import { revalidatePath } from "next/cache";

export async function criarAgendamentoAction(
  prevState: AgendamentoActionState | null,
  formData: FormData
): Promise<AgendamentoActionState> {
  console.log("Server Action: criarAgendamentoAction chamada");

  const rawFormData = {
    tipo: formData.get("tipo"),
    data: formData.get("data"),
    hora: formData.get("hora"),
    nomeSolicitantePrincipal: formData.get("nomeSolicitantePrincipal"),
    cpfSolicitantePrincipal: formData.get("cpfSolicitantePrincipal") || undefined,
    telefoneSolicitantePrincipal: formData.get("telefoneSolicitantePrincipal") || undefined,
    emailSolicitantePrincipal: formData.get("emailSolicitantePrincipal") || undefined,
    nomeSolicitanteSecundario: formData.get("nomeSolicitanteSecundario") || undefined,
    observacoes: formData.get("observacoes") || undefined,
  };

  console.log("Dados brutos do FormData (Agendamento):", JSON.stringify(rawFormData, null, 2));

  const validationResult = AgendamentoSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action (Agendamento):", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors as any,
      data: null,
    };
  }

  try {
    console.log("Dados validados (Agendamento), chamando o serviço:", validationResult.data);
    const novoAgendamento = await agendamentoService.criarAgendamento(validationResult.data as AgendamentoFormData);
    console.log("Resultado do serviço (Agendamento):", novoAgendamento);
    revalidatePath("/agendamentos"); // Para atualizar a lista de agendamentos na página
    return {
      message: "Agendamento criado com sucesso!",
      status: "success",
      data: novoAgendamento,
      errors: null,
    };
  } catch (error: any) {
    console.error("Erro ao criar agendamento no serviço:", error);
    return {
      message: error.message || "Ocorreu um erro ao processar o agendamento.",
      status: "error",
      errors: null,
      data: null,
    };
  }
}

export async function atualizarStatusAgendamentoAction(
  id: string,
  status: Agendamento["status"]
): Promise<AgendamentoActionState> {
  try {
    const agendamentoAtualizado = await agendamentoService.atualizarStatusAgendamento(id, status);
    if (agendamentoAtualizado) {
      revalidatePath("/agendamentos");
      return {
        message: `Status do agendamento ${id} atualizado para ${status}.`,
        status: "success",
        data: agendamentoAtualizado,
      };
    }
    return {
      message: `Agendamento ${id} não encontrado.`,
      status: "error",
      data: null,
    };
  } catch (error: any) {
    return {
      message: error.message || "Erro ao atualizar status do agendamento.",
      status: "error",
      data: null,
    };
  }
}

export async function deletarAgendamentoAction(id: string): Promise<Omit<AgendamentoActionState, "data">> {
    try {
        const deletado = await agendamentoService.deletarAgendamento(id);
        if (deletado) {
            revalidatePath("/agendamentos");
            return {
                message: `Agendamento ${id} deletado com sucesso.`,
                status: "success",
                errors: null,
            };
        }
        return {
            message: `Agendamento ${id} não encontrado ou já deletado.`,
            status: "error",
            errors: null,
        };
    } catch (error: any) {
        return {
            message: error.message || "Erro ao deletar agendamento.",
            status: "error",
            errors: null,
        };
    }
}

