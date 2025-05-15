import { z } from "zod";

const NatimortoSchema = z.object({
  nomeCompleto: z.string().optional().or(z.literal("")),
  sexo: z.enum(["Masculino", "Feminino", "Ignorado", "Indeterminado"], { errorMap: () => ({ message: "Sexo é obrigatório" }) }),
  dataEvento: z.string().min(1, "Data do evento é obrigatória"),
  horaEvento: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora do evento inválida (HH:MM)").optional().or(z.literal("")),
  localOcorrencia: z.string().min(1, "Local de ocorrência é obrigatório"),
  municipioOcorrencia: z.string().min(1, "Município de ocorrência é obrigatório"),
  ufOcorrencia: z.string().length(2, "UF de ocorrência deve ter 2 caracteres"),
  tempoGestacaoSemanas: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Tempo de gestação deve ser um número" }).int().positive("Tempo de gestação deve ser positivo").optional()
  ),
  tipoParto: z.enum(["Normal", "Cesáreo", "Fórceps", "Ignorado"], { errorMap: () => ({ message: "Tipo de parto inválido" }) }).optional(),
  pesoAoNascerGramas: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Peso deve ser um número" }).int().positive("Peso deve ser positivo").optional()
  ),
  causaMorteNatimorto: z.string().optional().or(z.literal("")),
});

const MaeNatimortoSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo da mãe é obrigatório"),
  naturalidade: z.string().optional().or(z.literal("")),
  nacionalidade: z.string().optional().or(z.literal("")),
  profissao: z.string().optional().or(z.literal("")),
  idadeEpocaParto: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Idade da mãe deve ser um número" }).int().positive("Idade da mãe deve ser positiva").optional()
  ),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF da mãe inválido").optional().or(z.literal("")),
  rg: z.string().optional().or(z.literal("")),
  enderecoCompleto: z.string().optional().or(z.literal("")),
  estadoCivil: z.enum(["Solteira", "Casada", "Divorciada", "Viúva", "União Estável", "Não informado"], { errorMap: () => ({ message: "Estado civil da mãe inválido" }) }).optional(),
});

const PaiNatimortoSchema = z.object({
  nomeCompleto: z.string().optional().or(z.literal("")),
  naturalidade: z.string().optional().or(z.literal("")),
  nacionalidade: z.string().optional().or(z.literal("")),
  profissao: z.string().optional().or(z.literal("")),
  idadeEpocaParto: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Idade do pai deve ser um número" }).int().positive("Idade do pai deve ser positiva").optional()
  ),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF do pai inválido").optional().or(z.literal("")),
  rg: z.string().optional().or(z.literal("")),
  enderecoCompleto: z.string().optional().or(z.literal("")),
  estadoCivil: z.enum(["Solteiro", "Casado", "Divorciado", "Viúvo", "União Estável", "Não informado"], { errorMap: () => ({ message: "Estado civil do pai inválido" }) }).optional(),
}).optional(); // Pai é opcional

const DeclaranteNatimortoSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo do declarante é obrigatório"),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF do declarante inválido").optional().or(z.literal("")),
  rg: z.string().optional().or(z.literal("")),
  vinculoComNatimortoOuPais: z.string().min(1, "Vínculo do declarante é obrigatório"),
  enderecoCompleto: z.string().optional().or(z.literal("")),
});

export const RegistroNatimortoSchema = z.object({
  natimorto: NatimortoSchema,
  mae: MaeNatimortoSchema,
  pai: PaiNatimortoSchema,
  declarante: DeclaranteNatimortoSchema,
  declaracaoObitoFetalUrl: z.string().optional().or(z.literal("")),
  documentosPaisUrl: z.string().optional().or(z.literal("")),
  comprovanteResidenciaPaisUrl: z.string().optional().or(z.literal("")),
});

export type RegistroNatimortoFormData = z.infer<typeof RegistroNatimortoSchema>;

