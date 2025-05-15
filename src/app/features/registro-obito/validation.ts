import { z } from "zod";

const FalecidoSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo do falecido é obrigatório"),
  sexo: z.enum(["Masculino", "Feminino", "Ignorado"], { errorMap: () => ({ message: "Sexo do falecido é obrigatório" }) }).optional(),
  nacionalidade: z.string().min(1, "Nacionalidade do falecido é obrigatória"),
  naturalidade: z.string().min(1, "Naturalidade (Cidade/UF) do falecido é obrigatória"),
  profissao: z.string().optional().or(z.literal("")),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF do falecido inválido").optional().or(z.literal("")),
  rg: z.string().optional().or(z.literal("")),
  dataNascimento: z.string().optional().or(z.literal("")), // Idealmente, validar formato de data
  estadoCivil: z.enum(["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável", "Não informado"], { errorMap: () => ({ message: "Estado civil do falecido inválido" }) }).optional(),
  nomeConjuge: z.string().optional().or(z.literal("")),
  nomePai: z.string().optional().or(z.literal("")),
  nomeMae: z.string().optional().or(z.literal("")),
  enderecoCompleto: z.string().optional().or(z.literal("")),
});

const DeclaranteObitoSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo do declarante é obrigatório"),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF do declarante inválido").optional().or(z.literal("")),
  rg: z.string().optional().or(z.literal("")),
  vinculoComFalecido: z.string().min(1, "Vínculo com o falecido é obrigatório"),
  enderecoCompleto: z.string().optional().or(z.literal("")),
});

export const RegistroObitoSchema = z.object({
  // Dados do Falecido
  falecido: FalecidoSchema,

  // Dados do Óbito
  dataObito: z.string().min(1, "Data do óbito é obrigatória"), // Idealmente, validar formato de data
  horaObito: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora do óbito inválida (HH:MM)").optional().or(z.literal("")),
  localObito: z.string().min(1, "Local do óbito é obrigatório"),
  municipioObito: z.string().min(1, "Município do óbito é obrigatório"),
  ufObito: z.string().length(2, "UF do óbito deve ter 2 caracteres"),
  causaMorteAtestadoMedico: z.string().min(1, "Causa da morte (conforme atestado) é obrigatória"),
  medicoResponsavelDeclaracaoNome: z.string().optional().or(z.literal("")),
  medicoResponsavelDeclaracaoCRM: z.string().optional().or(z.literal("")),
  localSepultamentoEnterro: z.string().optional().or(z.literal("")),
  seraCreimado: z.boolean().optional(),

  // Dados do Declarante
  declarante: DeclaranteObitoSchema,

  // Documentos Anexos (URLs ou identificadores)
  declaracaoObitoUrl: z.string().optional().or(z.literal("")),
  documentoFalecidoUrl: z.string().optional().or(z.literal("")),
  certidaoCasamentoNascimentoFalecidoUrl: z.string().optional().or(z.literal("")),
});

export type RegistroObitoFormData = z.infer<typeof RegistroObitoSchema>;

