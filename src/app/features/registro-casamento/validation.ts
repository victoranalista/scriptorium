import { z } from "zod";

const NoivoSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo é obrigatório"),
  sexo: z.enum(["Masculino", "Feminino", "Outro", "Não informado"], { errorMap: () => ({ message: "Sexo é obrigatório" }) }).optional(),
  nacionalidade: z.string().min(1, "Nacionalidade é obrigatória"),
  naturalidade: z.string().min(1, "Naturalidade (Cidade/UF) é obrigatória"),
  estadoCivilAnterior: z.enum(["Solteiro(a)", "Divorciado(a)", "Viúvo(a)", "Não informado"], { errorMap: () => ({ message: "Estado civil anterior é obrigatório" }) }),
  profissao: z.string().min(1, "Profissão é obrigatória"),
  idade: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Idade deve ser um número" }).int().positive("Idade deve ser positiva").optional()
  ),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido"),
  rg: z.string().min(1, "RG é obrigatório"),
  enderecoCompleto: z.string().min(1, "Endereço completo é obrigatório"),
  nomePai: z.string().min(1, "Nome do pai é obrigatório"),
  nomeMae: z.string().min(1, "Nome da mãe é obrigatório"),
  documentoIdentificacaoUrl: z.string().optional().or(z.literal("")),
  certidaoNascimentoCasamentoUrl: z.string().optional().or(z.literal("")),
});

const TestemunhaSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo da testemunha é obrigatório"),
  rg: z.string().min(1, "RG da testemunha é obrigatório"),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF da testemunha inválido"),
  enderecoCompleto: z.string().min(1, "Endereço da testemunha é obrigatório"),
  profissao: z.string().optional().or(z.literal("")),
});

export const RegistroCasamentoSchema = z.object({
  // Habilitação
  noivo1: NoivoSchema,
  noivo2: NoivoSchema,
  testemunha1: TestemunhaSchema,
  testemunha2: TestemunhaSchema,
  regimeBens: z.enum([
    "Comunhão Parcial de Bens",
    "Comunhão Universal de Bens",
    "Separação Total de Bens",
    "Participação Final nos Aquestos",
    "Separação Obrigatória de Bens"
  ], { errorMap: () => ({ message: "Regime de bens é obrigatório" }) }),
  pactoAntenupcialUrl: z.string().optional().or(z.literal("")),
  dataProvavelCerimonia: z.string().min(1, "Data provável da cerimônia é obrigatória"), // Idealmente, validar formato de data

  // Celebração
  dataCelebracao: z.string().min(1, "Data da celebração é obrigatória"), // Idealmente, validar formato de data
  localCelebracao: z.string().min(1, "Local da celebração é obrigatório"),
  nomeCelebrante: z.string().min(1, "Nome do celebrante é obrigatório"),
  testemunhaCerimonia1Nome: z.string().optional().or(z.literal("")),
  testemunhaCerimonia2Nome: z.string().optional().or(z.literal("")),
  nomeAdotadoNoivo1: z.string().optional().or(z.literal("")),
  nomeAdotadoNoivo2: z.string().optional().or(z.literal("")),
  
  // Documentos Gerais
  comprovanteResidenciaNoivosUrl: z.string().optional().or(z.literal("")),
});

export type RegistroCasamentoFormData = z.infer<typeof RegistroCasamentoSchema>;

