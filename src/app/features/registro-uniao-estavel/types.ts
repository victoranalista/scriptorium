export interface ConviventeData {
  nomeCompleto: string;
  nacionalidade: string;
  profissao: string;
  estadoCivil: "Solteiro(a)" | "Divorciado(a)" | "Viúvo(a)" | "Casado(a)" | "Separado(a) Judicialmente" | "Não informado"; // Casado(a) e Separado(a) podem ser impeditivos, mas o cartório orientará
  cpf: string;
  rg: string;
  enderecoCompleto: string;
  dataNascimento: string; // Idealmente, validar formato de data
  nomePai?: string;
  nomeMae?: string;
}

export interface TestemunhaUniaoEstavelData {
  nomeCompleto: string;
  rg: string;
  cpf: string;
  enderecoCompleto: string;
  profissao?: string;
}

export interface FilhoComumData {
  nomeCompleto: string;
  dataNascimento: string;
}

export interface RegistroUniaoEstavelFormData {
  convivente1: ConviventeData;
  convivente2: ConviventeData;
  dataInicioConvivencia?: string; // Opcional, mas comum
  regimeBens?: "Comunhão Parcial de Bens" | "Comunhão Universal de Bens" | "Separação Total de Bens" | "Participação Final nos Aquestos" | "Não especificado";
  pactoRegimeBensUrl?: string; // Para upload, se houver e não for comunhão parcial
  declaracaoVontadeConjunta: boolean; // Checkbox para confirmar a vontade
  filhosComuns?: FilhoComumData[];
  testemunha1?: TestemunhaUniaoEstavelData; // Testemunhas são opcionais para o registro em si, mas podem ser exigidas pelo cartório
  testemunha2?: TestemunhaUniaoEstavelData;
  documentosConvivente1Urls?: string[]; // Array de URLs para documentos do convivente 1
  documentosConvivente2Urls?: string[]; // Array de URLs para documentos do convivente 2
  comprovanteResidenciaComumUrl?: string;
  dataRegistro?: string; // Data em que o formulário é preenchido/assinado
}

// Para o estado da Server Action
export interface RegistroUniaoEstavelActionState {
  message: string;
  status: "success" | "error";
  errors?: Record<string, string[] | undefined> | Partial<Record<keyof RegistroUniaoEstavelFormData | string, string[]>> | null;
  data?: any;
}

