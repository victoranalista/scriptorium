import { RegistroNatimortoFormData } from "./types";

// Simula um banco de dados em memória para os registros de natimorto
const registrosNatimorto: any[] = [];

/**
 * @description Service para simular a criação de um registro de natimorto.
 * Em uma aplicação real, aqui ocorreria a interação com o banco de dados.
 */
export const registroNatimortoService = {
  async criarRegistroNatimorto(data: RegistroNatimortoFormData): Promise<{ id: string; message: string; data: RegistroNatimortoFormData }> {
    console.log("Dados recebidos no serviço para criar registro de natimorto:", data);

    // Simula a criação de um ID único para o novo registro
    const novoRegistro = {
      id: `nati-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...data,
      dataRegistroSistema: new Date().toISOString(), // Data do registro no sistema
      status: "Registrado", // Exemplo de status inicial
    };

    registrosNatimorto.push(novoRegistro);
    console.log("Registro de natimorto simulado criado:", novoRegistro);

    // Simula uma resposta de sucesso
    return {
      id: novoRegistro.id,
      message: "Registro de Natimorto criado com sucesso (simulado).",
      data: novoRegistro,
    };
  },

  async buscarRegistroPorId(id: string): Promise<any | null> {
    const registro = registrosNatimorto.find(r => r.id === id);
    return registro || null;
  }
};

