"use server";

import { z } from "zod";
import { RegistroNatimortoSchema, RegistroNatimortoFormData } from "./validation";
import { registroNatimortoService } from "./services";
import { RegistroNatimortoActionState } from "./types";

export async function criarRegistroNatimortoAction(
  prevState: RegistroNatimortoActionState | null,
  formData: FormData
): Promise<RegistroNatimortoActionState> {
  console.log("Server Action: criarRegistroNatimortoAction chamada");

  // Helper para converter FormData aninhado
  const processFormData = (fd: FormData): Record<string, any> => {
    const object: Record<string, any> = {};
    for (const [key, value] of fd.entries()) {
      const keys = key.split(/[\.\[\]]+/).filter(k => k);
      let current = object;
      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          // Tratar campos numéricos que podem vir vazios ou não numéricos
          if ((k === "tempoGestacaoSemanas" || k === "pesoAoNascerGramas" || k === "idadeEpocaParto") && (value === "" || isNaN(Number(value)))) {
            current[k] = undefined;
          } else if (value === "" && (k === "nomeCompleto" || k === "horaEvento" || k === "causaMorteNatimorto" || k === "naturalidade" || k === "nacionalidade" || k === "profissao" || k === "cpf" || k === "rg" || k === "enderecoCompleto" || k === "estadoCivil")) {
            current[k] = undefined; // Tratar strings vazias como undefined para campos opcionais
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
    return object;
  };

  const rawFormData = processFormData(formData);
  console.log("Dados brutos do FormData (Natimorto):", JSON.stringify(rawFormData, null, 2));

  const validationResult = RegistroNatimortoSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action (Natimorto):", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors as any,
    };
  }

  try {
    console.log("Dados validados (Natimorto), chamando o serviço:", validationResult.data);
    const result = await registroNatimortoService.criarRegistroNatimorto(validationResult.data as RegistroNatimortoFormData);
    console.log("Resultado do serviço (Natimorto):", result);
    return {
      message: result.message || "Registro de Natimorto criado com sucesso!",
      status: "success",
      data: result.data,
      errors: null,
    };
  } catch (error: any) {
    console.error("Erro ao criar registro de natimorto no serviço:", error);
    return {
      message: error.message || "Ocorreu um erro ao processar o registro de natimorto.",
      status: "error",
      errors: null,
    };
  }
}

