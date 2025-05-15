import { RegistroObitoFormData } from "./types";

// Simula um banco de dados em memória para os registros de óbito
const registrosObito: any[] = [];

/**
 * @description Service para simular a criação de um registro de óbito.
 * Em uma aplicação real, aqui ocorreria a interação com o banco de dados.
 */
export const registroObitoService = {
  async criarRegistroObito(data: RegistroObitoFormData): Promise<{ id: string; message: string; data: RegistroObitoFormData }> {
    console.log("Dados recebidos no serviço para criar registro de óbito:", data);

    // Simula a criação de um ID único para o novo registro
    const novoRegistro = {
      id: `obito-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...data,
      dataRegistroSistema: new Date().toISOString(),
      status: "Registrado", // Exemplo de status inicial
    };

    registrosObito.push(novoRegistro);
    console.log("Registro de óbito simulado criado:", novoRegistro);

    // Simula uma resposta de sucesso
    return {
      id: novoRegistro.id,
      message: "Registro de Óbito criado com sucesso (simulado).",
      data: novoRegistro,
    };
  },

  async buscarRegistroPorId(id: string): Promise<any | null> {
    const registro = registrosObito.find(r => r.id === id);
    return registro || null;
  }
};

