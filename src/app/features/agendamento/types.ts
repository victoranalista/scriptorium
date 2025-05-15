export type TipoAgendamento = "CasamentoCivil" | "AtendimentoGeral" | "ReconhecimentoFirma" | "Procuracao" | "Outro";

export interface Agendamento {
  id: string;
  tipo: TipoAgendamento;
  data: string; // Formato YYYY-MM-DD
  hora: string; // Formato HH:MM
  nomeSolicitantePrincipal: string;
  cpfSolicitantePrincipal?: string;
  telefoneSolicitantePrincipal?: string;
  emailSolicitantePrincipal?: string;
  nomeSolicitanteSecundario?: string; // Para casamento, por exemplo
  observacoes?: string;
  status: "Pendente" | "Confirmado" | "Cancelado" | "Realizado";
  dataCriacao: string; // ISOString
  dataAtualizacao?: string; // ISOString
}

export interface AgendamentoFormData {
  tipo: TipoAgendamento;
  data: string;
  hora: string;
  nomeSolicitantePrincipal: string;
  cpfSolicitantePrincipal?: string;
  telefoneSolicitantePrincipal?: string;
  emailSolicitantePrincipal?: string;
  nomeSolicitanteSecundario?: string;
  observacoes?: string;
}

export interface AgendamentoActionState {
  message: string;
  status: "success" | "error";
  errors?: Partial<Record<keyof AgendamentoFormData | string, string[]>> | null;
  data?: Agendamento | null;
}

