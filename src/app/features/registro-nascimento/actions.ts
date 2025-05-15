"use server";

import { z } from "zod";
import { RegistroNascimentoSchema, RegistroNascimentoFormData } from "./validation";
import { registroNascimentoService } from "./services";

export interface ActionState {
  message: string;
  status: "success" | "error";
  errors?: Record<string, string[]> | null;
  data?: any;
}

export async function criarRegistroNascimentoAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  console.log("Server Action: criarRegistroNascimentoAction chamada");

  // Conver FormData para objeto
  const rawFormData: Record<string, any> = {};
  formData.forEach((value, key) => {
    // Lida com campos que podem ser arrays (ex: checkboxes agrupados, se houver)
    // Neste formulário específico, não temos, mas é uma boa prática considerar
    if (key.endsWith("[]")) {
      const actualKey = key.slice(0, -2);
      if (!rawFormData[actualKey]) {
        rawFormData[actualKey] = [];
      }
      (rawFormData[actualKey] as string[]).push(value as string);
    } else {
      rawFormData[key] = value;
    }
  });

  console.log("Dados brutos do FormData:", rawFormData);

  const validationResult = RegistroNascimentoSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action:", validationResult.error.flatten().fieldErrors);
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    console.log("Dados validados, chamando o serviço:", validationResult.data);
    const result = await registroNascimentoService.criarRegistroNascimento(validationResult.data as RegistroNascimentoFormData);
    console.log("Resultado do serviço:", result);
    return {
      message: result.message || "Registro de Nascimento criado com sucesso!",
      status: "success",
      data: result.data,
      errors: null,
    };
  } catch (error: any) {
    console.error("Erro ao criar registro de nascimento no serviço:", error);
    return {
      message: error.message || "Ocorreu um erro ao processar o registro.",
      status: "error",
      errors: null,
    };
  }
}

