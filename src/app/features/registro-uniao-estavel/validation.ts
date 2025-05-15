import { z } from "zod";

const ConviventeSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo é obrigatório"),
  nacionalidade: z.string().min(1, "Nacionalidade é obrigatória"),
  profissao: z.string().min(1, "Profissão é obrigatória"),
  estadoCivil: z.enum(["Solteiro(a)", "Divorciado(a)", "Viúvo(a)", "Casado(a)", "Separado(a) Judicialmente", "Não informado"], { errorMap: () => ({ message: "Estado civil é obrigatório" }) }),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido"),
  rg: z.string().min(1, "RG é obrigatório"),
  enderecoCompleto: z.string().min(1, "Endereço completo é obrigatório"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"), // Idealmente, validar formato de data
  nomePai: z.string().optional().or(z.literal("")),
  nomeMae: z.string().optional().or(z.literal("")),
});

const TestemunhaUniaoEstavelSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo da testemunha é obrigatório"),
  rg: z.string().min(1, "RG da testemunha é obrigatório"),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF da testemunha inválido"),
  enderecoCompleto: z.string().min(1, "Endereço da testemunha é obrigatório"),
  profissao: z.string().optional().or(z.literal("")),
}).optional(); // Testemunhas são opcionais

const FilhoComumSchema = z.object({
  nomeCompleto: z.string().min(1, "Nome completo do filho é obrigatório"),
  dataNascimento: z.string().min(1, "Data de nascimento do filho é obrigatória"),
});

export const RegistroUniaoEstavelSchema = z.object({
  convivente1: ConviventeSchema,
  convivente2: ConviventeSchema,
  dataInicioConvivencia: z.string().optional().or(z.literal("")), // Idealmente, validar formato de data
  regimeBens: z.enum([
    "Comunhão Parcial de Bens",
    "Comunhão Universal de Bens",
    "Separação Total de Bens",
    "Participação Final nos Aquestos",
    "Não especificado"
  ], { errorMap: () => ({ message: "Regime de bens é obrigatório" }) }).optional(),
  pactoRegimeBensUrl: z.string().optional().or(z.literal("")),
  declaracaoVontadeConjunta: z.boolean().refine(val => val === true, {
    message: "A declaração de vontade conjunta de constituir união estável é obrigatória."
  }),
  filhosComuns: z.array(FilhoComumSchema).optional(),
  testemunha1: TestemunhaUniaoEstavelSchema,
  testemunha2: TestemunhaUniaoEstavelSchema,
  // Para uploads, vamos tratar como string (URL ou ID) por enquanto. A lógica de upload é separada.
  documentosConvivente1Urls: z.array(z.string()).optional(),
  documentosConvivente2Urls: z.array(z.string()).optional(),
  comprovanteResidenciaComumUrl: z.string().optional().or(z.literal("")),
  dataRegistro: z.string().optional().or(z.literal("")), // Idealmente, validar formato de data
});

export type RegistroUniaoEstavelFormData = z.infer<typeof RegistroUniaoEstavelSchema>;

