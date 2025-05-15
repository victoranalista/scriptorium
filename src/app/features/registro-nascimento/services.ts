import { RegistroNascimentoFormData } from "./types";

// Simula um banco de dados em memória para os registros de nascimento
const registrosNascimento: any[] = [];

/**
 * @description Service para simular a criação de um registro de nascimento.
 * Em uma aplicação real, aqui ocorreria a interação com o banco de dados.
 */
export const registroNascimentoService = {
  async criarRegistroNascimento(data: RegistroNascimentoFormData): Promise<{ id: string; message: string; data: RegistroNascimentoFormData }> {
    console.log("Dados recebidos no serviço para criar registro de nascimento:", data);

    // Simula a criação de um ID único para o novo registro
    const novoRegistro = {
      id: `nasc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...data,
      dataRegistro: new Date().toISOString(),
      status: "Pendente", // Exemplo de status inicial
    };

    registrosNascimento.push(novoRegistro);
    console.log("Registro de nascimento simulado criado:", novoRegistro);

    // Simula uma resposta de sucesso
    return {
      id: novoRegistro.id,
      message: "Registro de Nascimento criado com sucesso (simulado).",
      data: novoRegistro,
    };
  },

  async buscarRegistroPorId(id: string): Promise<any | null> {
    const registro = registrosNascimento.find(r => r.id === id);
    return registro || null;
  }
};

