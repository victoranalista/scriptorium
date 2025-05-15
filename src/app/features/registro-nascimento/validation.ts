import { z } from "zod";

export const RegistroNascimentoSchema = z.object({
  // Dados da Criança
  criancaNomeCompleto: z.string().min(1, "Nome completo da criança é obrigatório"),
  criancaSexo: z.enum(["Masculino", "Feminino", "Ignorado"], { errorMap: () => ({ message: "Sexo da criança é obrigatório" }) }),
  criancaDataNascimento: z.string().min(1, "Data de nascimento é obrigatória"), // Idealmente, validar formato de data
  criancaHoraNascimento: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora de nascimento inválida (HH:MM)").optional().or(z.literal("")),
  criancaLocalNascimento: z.string().min(1, "Local de nascimento é obrigatório"),
  criancaMunicipioNascimento: z.string().min(1, "Município de nascimento é obrigatório"),
  criancaUFNascimento: z.string().length(2, "UF de nascimento deve ter 2 caracteres"),
  criancaNacionalidade: z.string().min(1, "Nacionalidade da criança é obrigatória"),

  // Dados da Mãe
  maeNomeCompleto: z.string().min(1, "Nome completo da mãe é obrigatório"),
  maeNaturalidade: z.string().optional().or(z.literal("")),
  maeNacionalidade: z.string().optional().or(z.literal("")),
  maeProfissao: z.string().optional().or(z.literal("")),
  maeIdadeEpocaNascimento: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Idade da mãe deve ser um número" }).int().positive("Idade da mãe deve ser positiva").optional()
  ),
  maeCPF: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF da mãe inválido").optional().or(z.literal("")),
  maeRG: z.string().optional().or(z.literal("")),
  maeEnderecoCompleto: z.string().optional().or(z.literal("")),
  maeEstadoCivil: z.enum(["Solteira", "Casada", "Divorciada", "Viúva", "União Estável", "Não informado"], { errorMap: () => ({ message: "Estado civil da mãe inválido" }) }).optional(),

  // Dados do Pai
  paiNomeCompleto: z.string().optional().or(z.literal("")),
  paiNaturalidade: z.string().optional().or(z.literal("")),
  paiNacionalidade: z.string().optional().or(z.literal("")),
  paiProfissao: z.string().optional().or(z.literal("")),
  paiIdadeEpocaNascimento: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : Number(val),
    z.number({ invalid_type_error: "Idade do pai deve ser um número" }).int().positive("Idade do pai deve ser positiva").optional()
  ),
  paiCPF: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF do pai inválido").optional().or(z.literal("")),
  paiRG: z.string().optional().or(z.literal("")),
  paiEnderecoCompleto: z.string().optional().or(z.literal("")),
  paiEstadoCivil: z.enum(["Solteiro", "Casado", "Divorciado", "Viúvo", "União Estável", "Não informado"], { errorMap: () => ({ message: "Estado civil do pai inválido" }) }).optional(),
  
  // Dados do Declarante (se não for pai ou mãe)
  declaranteNomeCompleto: z.string().optional().or(z.literal("")),
  declaranteDocumentoIdentificacao: z.string().optional().or(z.literal("")),
  declaranteParentescoVinculo: z.string().optional().or(z.literal("")),

  // Documentos Anexos (tratados como strings para URLs ou identificadores; a lógica de upload é separada)
  dnvNumero: z.string().min(1, "Número da DNV é obrigatório").optional().or(z.literal("")), // Ou z.any() para File se for client-side com react-hook-form
  // Para os arquivos em si, a validação de tipo/tamanho geralmente é feita no client-side antes do upload
  // ou no backend ao receber o arquivo. Aqui, podemos ter campos para os nomes dos arquivos ou status.
  // Exemplo: docDnv: z.any().optional(), docPais: z.any().optional(), docComprovanteResidencia: z.any().optional()
});

export type RegistroNascimentoFormData = z.infer<typeof RegistroNascimentoSchema>;

