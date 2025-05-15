export interface NoivoData {
  nomeCompleto: string;
  sexo?: "Masculino" | "Feminino" | "Outro" | "Não informado";
  nacionalidade: string;
  naturalidade: string; // Cidade/UF
  estadoCivilAnterior: "Solteiro(a)" | "Divorciado(a)" | "Viúvo(a)" | "Não informado";
  profissao: string;
  idade: number | undefined;
  cpf: string;
  rg: string;
  enderecoCompleto: string;
  nomePai: string;
  nomeMae: string;
  documentoIdentificacaoUrl?: string; // Para upload
  certidaoNascimentoCasamentoUrl?: string; // Para upload
}

export interface TestemunhaData {
  nomeCompleto: string;
  rg: string;
  cpf: string;
  enderecoCompleto: string;
  profissao?: string;
}

export interface RegistroCasamentoFormData {
  // Habilitação
  noivo1: NoivoData;
  noivo2: NoivoData;
  testemunha1: TestemunhaData;
  testemunha2: TestemunhaData;
  regimeBens: "Comunhão Parcial de Bens" | "Comunhão Universal de Bens" | "Separação Total de Bens" | "Participação Final nos Aquestos" | "Separação Obrigatória de Bens";
  pactoAntenupcialUrl?: string; // Para upload, se houver
  dataProvavelCerimonia: string; // Idealmente, validar formato de data

  // Celebração
  dataCelebracao: string; // Idealmente, validar formato de data
  localCelebracao: string;
  nomeCelebrante: string;
  testemunhaCerimonia1Nome?: string; // Testemunhas da cerimônia podem ser diferentes
  testemunhaCerimonia2Nome?: string;
  nomeAdotadoNoivo1?: string; // Se houver alteração
  nomeAdotadoNoivo2?: string; // Se houver alteração

  // Documentos Gerais
  comprovanteResidenciaNoivosUrl?: string;
}

// Para o estado da Server Action
export interface RegistroCasamentoActionState {
  message: string;
  status: "success" | "error";
  errors?: Record<string, string[] | undefined> | Partial<Record<keyof RegistroCasamentoFormData | string, string[]>> | null;
  data?: any;
}

