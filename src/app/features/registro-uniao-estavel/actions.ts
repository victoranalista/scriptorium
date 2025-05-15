"use server";

import { z } from "zod";
import { RegistroUniaoEstavelSchema, RegistroUniaoEstavelFormData } from "./validation";
import { registroUniaoEstavelService } from "./services";
import { RegistroUniaoEstavelActionState } from "./types";

export async function criarRegistroUniaoEstavelAction(
  prevState: RegistroUniaoEstavelActionState | null,
  formData: FormData
): Promise<RegistroUniaoEstavelActionState> {
  console.log("Server Action: criarRegistroUniaoEstavelAction chamada");

  // Helper para converter FormData aninhado e lidar com arrays (para filhosComuns)
  const processFormData = (fd: FormData): Record<string, any> => {
    const object: Record<string, any> = {};
    const filhosComuns: any[] = [];
    const rawFilhos: Record<number, any> = {};

    for (const [key, value] of fd.entries()) {
      // Tratamento para filhosComuns
      const filhoMatch = key.match(/^filhosComuns\[(\d+)\]\.(.+)$/);
      if (filhoMatch) {
        const index = parseInt(filhoMatch[1], 10);
        const fieldName = filhoMatch[2];
        if (!rawFilhos[index]) {
          rawFilhos[index] = {};
        }
        rawFilhos[index][fieldName] = value;
        continue; // Pula para a próxima iteração após tratar filho
      }

      // Tratamento para outros campos aninhados (convivente1, convivente2, testemunha1, testemunha2)
      const keys = key.split(/[\.\[\]]+/).filter(k => k);
      let current = object;
      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          if (key === "declaracaoVontadeConjunta" && value === "on") {
            current[k] = true;
          } else if (value === "" && (k === "dataInicioConvivencia" || k === "pactoRegimeBensUrl" || k === "comprovanteResidenciaComumUrl" || k === "dataRegistro" || k === "nomePai" || k === "nomeMae")) {
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

    // Converter rawFilhos para o array filhosComuns
    Object.values(rawFilhos).forEach(filho => {
      if (filho.nomeCompleto || filho.dataNascimento) { // Adiciona apenas se houver dados
        filhosComuns.push(filho);
      }
    });
    if (filhosComuns.length > 0) {
      object.filhosComuns = filhosComuns;
    }
    
    // Garantir que declaracaoVontadeConjunta seja boolean
    if (formData.get("declaracaoVontadeConjunta") === null && !object.declaracaoVontadeConjunta) {
        object.declaracaoVontadeConjunta = false;
    }

    return object;
  };

  const rawFormData = processFormData(formData);
  console.log("Dados brutos do FormData (União Estável):", JSON.stringify(rawFormData, null, 2));

  const validationResult = RegistroUniaoEstavelSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action (União Estável):", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors as any,
    };
  }

  try {
    console.log("Dados validados (União Estável), chamando o serviço:", validationResult.data);
    const result = await registroUniaoEstavelService.criarRegistroUniaoEstavel(validationResult.data as RegistroUniaoEstavelFormData);
    console.log("Resultado do serviço (União Estável):", result);
    return {
      message: result.message || "Registro de União Estável criado com sucesso!",
      status: "success",
      data: result.data,
      errors: null,
    };
  } catch (error: any) {
    console.error("Erro ao criar registro de união estável no serviço:", error);
    return {
      message: error.message || "Ocorreu um erro ao processar o registro de união estável.",
      status: "error",
      errors: null,
    };
  }
}

