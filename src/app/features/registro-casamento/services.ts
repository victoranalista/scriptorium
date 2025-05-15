import { RegistroCasamentoFormData } from "./types";

// Simula um banco de dados em memória para os registros de casamento
const registrosCasamento: any[] = [];

/**
 * @description Service para simular a criação de um registro de casamento.
 * Em uma aplicação real, aqui ocorreria a interação com o banco de dados.
 */
export const registroCasamentoService = {
  async criarRegistroCasamento(data: RegistroCasamentoFormData): Promise<{ id: string; message: string; data: RegistroCasamentoFormData }> {
    console.log("Dados recebidos no serviço para criar registro de casamento:", data);

    // Simula a criação de um ID único para o novo registro
    const novoRegistro = {
      id: `cas-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...data,
      dataRegistroSistema: new Date().toISOString(),
      status: "Habilitação em Análise", // Exemplo de status inicial
    };

    registrosCasamento.push(novoRegistro);
    console.log("Registro de casamento simulado criado:", novoRegistro);

    // Simula uma resposta de sucesso
    return {
      id: novoRegistro.id,
      message: "Registro de Casamento (Habilitação) iniciado com sucesso (simulado).",
      data: novoRegistro,
    };
  },

  async buscarRegistroPorId(id: string): Promise<any | null> {
    const registro = registrosCasamento.find(r => r.id === id);
    return registro || null;
  }
};

