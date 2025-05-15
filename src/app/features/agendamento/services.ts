import { Agendamento, AgendamentoFormData } from "./types";

// Simula um banco de dados em memória para os agendamentos
let agendamentos: Agendamento[] = [
  // Dados de exemplo iniciais (opcional)
  {
    id: "ag-exemplo-1",
    tipo: "CasamentoCivil",
    data: "2025-07-15",
    hora: "10:00",
    nomeSolicitantePrincipal: "Fulano de Tal",
    cpfSolicitantePrincipal: "111.111.111-11",
    telefoneSolicitantePrincipal: "(11) 99999-1111",
    emailSolicitantePrincipal: "fulano@example.com",
    nomeSolicitanteSecundario: "Ciclana de Sousa",
    observacoes: "Cerimônia simples.",
    status: "Confirmado",
    dataCriacao: new Date().toISOString(),
  },
  {
    id: "ag-exemplo-2",
    tipo: "AtendimentoGeral",
    data: "2025-07-16",
    hora: "14:30",
    nomeSolicitantePrincipal: "Beltrano Silva",
    cpfSolicitantePrincipal: "222.222.222-22",
    telefoneSolicitantePrincipal: "(22) 98888-2222",
    emailSolicitantePrincipal: "beltrano@example.com",
    observacoes: "Dúvidas sobre registro de imóvel.",
    status: "Pendente",
    dataCriacao: new Date().toISOString(),
  },
];

export const agendamentoService = {
  async criarAgendamento(data: AgendamentoFormData): Promise<Agendamento> {
    console.log("Dados recebidos no serviço para criar agendamento:", data);
    const novoAgendamento: Agendamento = {
      id: `ag-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...data,
      status: "Pendente", // Status inicial padrão
      dataCriacao: new Date().toISOString(),
    };
    agendamentos.push(novoAgendamento);
    console.log("Agendamento simulado criado:", novoAgendamento);
    return novoAgendamento;
  },

  async listarAgendamentos(filtros?: { data?: string; status?: Agendamento["status"] }): Promise<Agendamento[]> {
    console.log("Listando agendamentos com filtros:", filtros);
    let resultado = [...agendamentos];
    if (filtros?.data) {
      resultado = resultado.filter(ag => ag.data === filtros.data);
    }
    if (filtros?.status) {
      resultado = resultado.filter(ag => ag.status === filtros.status);
    }
    // Ordena por data e hora para melhor visualização
    resultado.sort((a, b) => {
      const dataHoraA = new Date(`${a.data}T${a.hora}`);
      const dataHoraB = new Date(`${b.data}T${b.hora}`);
      return dataHoraA.getTime() - dataHoraB.getTime();
    });
    return resultado;
  },

  async buscarAgendamentoPorId(id: string): Promise<Agendamento | null> {
    const agendamento = agendamentos.find(ag => ag.id === id);
    return agendamento || null;
  },

  async atualizarStatusAgendamento(id: string, status: Agendamento["status"]): Promise<Agendamento | null> {
    const index = agendamentos.findIndex(ag => ag.id === id);
    if (index !== -1) {
      agendamentos[index].status = status;
      agendamentos[index].dataAtualizacao = new Date().toISOString();
      console.log(`Status do agendamento ${id} atualizado para ${status}`);
      return agendamentos[index];
    }
    return null;
  },
  
  async deletarAgendamento(id: string): Promise<boolean> {
    const tamanhoInicial = agendamentos.length;
    agendamentos = agendamentos.filter(ag => ag.id !== id);
    const deletado = agendamentos.length < tamanhoInicial;
    if (deletado) {
        console.log(`Agendamento ${id} deletado.`);
    }
    return deletado;
  }
};

