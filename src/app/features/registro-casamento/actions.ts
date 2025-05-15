"use server";

import { z } from "zod";
import { RegistroCasamentoSchema, RegistroCasamentoFormData } from "./validation";
import { registroCasamentoService } from "./services";
import { RegistroCasamentoActionState } from "./types"; // Importar do types.ts

export async function criarRegistroCasamentoAction(
  prevState: RegistroCasamentoActionState | null,
  formData: FormData
): Promise<RegistroCasamentoActionState> {
  console.log("Server Action: criarRegistroCasamentoAction chamada");

  // Helper para converter FormData aninhado
  const processFormData = (fd: FormData, prefix = ""): Record<string, any> => {
    const object: Record<string, any> = {};
    for (const [key, value] of fd.entries()) {
      if (key.startsWith(prefix)) {
        const newKey = key.substring(prefix.length);
        const keys = newKey.split(/[\.\[\]]+/).filter(k => k);
        let current = object;
        keys.forEach((k, i) => {
          if (i === keys.length - 1) {
            // Lidar com campos numéricos que podem vir vazios
            if ((k === "idade" && value === "")) {
              current[k] = undefined;
            } else {
              current[k] = value;
            }
          } else {
            if (!current[k] || typeof current[k] !== "object") {
              current[k] = keys[i+1].match(/^\d+$/) ? [] : {};
            }
            current = current[k];
          }
        });
      }
    }
    return object;
  };

  const rawFormData = processFormData(formData);
  console.log("Dados brutos do FormData (processados):", JSON.stringify(rawFormData, null, 2));

  const validationResult = RegistroCasamentoSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action (Casamento):", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors as any, // Cast para evitar problemas de tipo complexo
    };
  }

  try {
    console.log("Dados validados (Casamento), chamando o serviço:", validationResult.data);
    const result = await registroCasamentoService.criarRegistroCasamento(validationResult.data as RegistroCasamentoFormData);
    console.log("Resultado do serviço (Casamento):", result);
    return {
      message: result.message || "Registro de Casamento criado com sucesso!",
      status: "success",
      data: result.data,
      errors: null,
    };
  } catch (error: any) {
    console.error("Erro ao criar registro de casamento no serviço:", error);
    return {
      message: error.message || "Ocorreu um erro ao processar o registro de casamento.",
      status: "error",
      errors: null,
    };
  }
}

