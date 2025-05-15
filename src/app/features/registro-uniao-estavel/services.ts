import { RegistroUniaoEstavelFormData } from "./types";

// Simula um banco de dados em memória para os registros de união estável
const registrosUniaoEstavel: any[] = [];

/**
 * @description Service para simular a criação de um registro de união estável.
 * Em uma aplicação real, aqui ocorreria a interação com o banco de dados.
 */
export const registroUniaoEstavelService = {
  async criarRegistroUniaoEstavel(data: RegistroUniaoEstavelFormData): Promise<{ id: string; message: string; data: RegistroUniaoEstavelFormData }> {
    console.log("Dados recebidos no serviço para criar registro de união estável:", data);

    // Simula a criação de um ID único para o novo registro
    const novoRegistro = {
      id: `uniao-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...data,
      dataRegistroSistema: new Date().toISOString(), // Data do registro no sistema
      status: "Registrado", // Exemplo de status inicial
    };

    registrosUniaoEstavel.push(novoRegistro);
    console.log("Registro de união estável simulado criado:", novoRegistro);

    // Simula uma resposta de sucesso
    return {
      id: novoRegistro.id,
      message: "Registro de União Estável criado com sucesso (simulado).",
      data: novoRegistro,
    };
  },

  async buscarRegistroPorId(id: string): Promise<any | null> {
    const registro = registrosUniaoEstavel.find(r => r.id === id);
    return registro || null;
  }
};

