import { z } from "zod";
import { TipoAgendamento } from "./types";

const tiposAgendamentoValidos: [TipoAgendamento, ...TipoAgendamento[]] = [
  "CasamentoCivil",
  "AtendimentoGeral",
  "ReconhecimentoFirma",
  "Procuracao",
  "Outro"
];

export const AgendamentoSchema = z.object({
  tipo: z.enum(tiposAgendamentoValidos, {
    errorMap: () => ({ message: "Tipo de agendamento inválido." }),
  }),
  data: z.string().min(1, "Data do agendamento é obrigatória.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (AAAA-MM-DD)."),
  hora: z.string().min(1, "Hora do agendamento é obrigatória.")
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)."),
  nomeSolicitantePrincipal: z.string().min(3, "Nome do solicitante principal é obrigatório (mínimo 3 caracteres)."),
  cpfSolicitantePrincipal: z.string()
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF do solicitante principal inválido.")
    .optional().or(z.literal("")),
  telefoneSolicitantePrincipal: z.string()
    .regex(/^(\(\d{2}\)\s?)?(\d{4,5}-?\d{4})$/, "Telefone do solicitante principal inválido.")
    .optional().or(z.literal("")),
  emailSolicitantePrincipal: z.string().email("Email do solicitante principal inválido.").optional().or(z.literal("")),
  nomeSolicitanteSecundario: z.string().optional().or(z.literal("")),
  observacoes: z.string().max(500, "Observações devem ter no máximo 500 caracteres.").optional().or(z.literal("")),
});

export type AgendamentoFormData = z.infer<typeof AgendamentoSchema>;

