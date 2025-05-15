"use server";

import { z } from "zod";
import { RegistroObitoSchema, RegistroObitoFormData } from "./validation";
import { registroObitoService } from "./services";
import { RegistroObitoActionState } from "./types"; // Importar do types.ts

export async function criarRegistroObitoAction(
  prevState: RegistroObitoActionState | null,
  formData: FormData
): Promise<RegistroObitoActionState> {
  console.log("Server Action: criarRegistroObitoAction chamada");

  // Helper para converter FormData aninhado
  const processFormData = (fd: FormData, prefix = ""): Record<string, any> => {
    const object: Record<string, any> = {};
    for (const [key, value] of fd.entries()) {
      if (key.startsWith(prefix)) {
        const newKey = key.substring(prefix.length);
        // Tratar chaves como 'falecido.nomeCompleto' ou 'declarante.cpf'
        const keys = newKey.split('.'); 
        let current = object;
        keys.forEach((k, i) => {
          if (i === keys.length - 1) {
            // Lidar com campos booleanos (checkboxes)
            if (value === "on" && fd.get(key) === "on") { // Simplificado, idealmente o nome do checkbox seria único
                 current[k] = true;
            } else if (value === "" && (k === "dataNascimento" || k === "horaObito" || k === "cpf" || k === "rg" || k === "profissao" || k === "nomeConjuge" || k === "nomePai" || k === "nomeMae" || k === "enderecoCompleto" || k === "medicoResponsavelDeclaracaoNome" || k === "medicoResponsavelDeclaracaoCRM" || k === "localSepultamentoEnterro" )) {
                 current[k] = undefined; // Tratar strings vazias como undefined para campos opcionais
            } else {
                 current[k] = value;
            }
          } else {
            if (!current[k] || typeof current[k] !== "object") {
              current[k] = {}; // Cria um objeto aninhado se não existir
            }
            current = current[k];
          }
        });
      }
    }
    return object;
  };
  
  const rawFormData = processFormData(formData);
  // O campo 'seraCreimado' pode não vir se não for marcado, então garantimos que ele exista para validação
  if (formData.get("falecido.seraCreimado") === null && rawFormData.falecido) {
    rawFormData.falecido.seraCreimado = false;
  }
  if (formData.get("seraCreimado") === null && !rawFormData.seraCreimado) { // Ajuste para pegar o campo no nível correto
    rawFormData.seraCreimado = false;
  }


  console.log("Dados brutos do FormData (processados para Óbito):", JSON.stringify(rawFormData, null, 2));

  const validationResult = RegistroObitoSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    console.error("Erro de validação na Server Action (Óbito):", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
    return {
      message: "Erro de validação. Verifique os campos.",
      status: "error",
      errors: validationResult.error.flatten().fieldErrors as any, // Cast para evitar problemas de tipo complexo
    };
  }

  try {
    console.log("Dados validados (Óbito), chamando o serviço:", validationResult.data);
    const result = await registroObitoService.criarRegistroObito(validationResult.data as RegistroObitoFormData);
    console.log("Resultado do serviço (Óbito):", result);
    return {
      message: result.message || "Registro de Óbito criado com sucesso!",
      status: "success",
      data: result.data,
      errors: null,
    };
  } catch (error: any) {
    console.error("Erro ao criar registro de óbito no serviço:", error);
    return {
      message: error.message || "Ocorreu um erro ao processar o registro de óbito.",
      status: "error",
      errors: null,
    };
  }
}

