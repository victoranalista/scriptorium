export interface FalecidoData {
  nomeCompleto: string;
  sexo?: "Masculino" | "Feminino" | "Ignorado";
  nacionalidade: string;
  naturalidade: string; // Cidade/UF
  profissao?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: string; // Idealmente, validar formato de data
  estadoCivil?: "Solteiro(a)" | "Casado(a)" | "Divorciado(a)" | "Viúvo(a)" | "União Estável" | "Não informado";
  nomeConjuge?: string;
  nomePai?: string;
  nomeMae?: string;
  enderecoCompleto?: string;
}

export interface DeclaranteObitoData {
  nomeCompleto: string;
  cpf?: string;
  rg?: string;
  vinculoComFalecido: string;
  enderecoCompleto?: string;
}

export interface RegistroObitoFormData {
  // Dados do Falecido
  falecido: FalecidoData;

  // Dados do Óbito
  dataObito: string; // Idealmente, validar formato de data
  horaObito?: string; // HH:MM, opcional
  localObito: string; // Hospital, domicílio, via pública, etc.
  municipioObito: string;
  ufObito: string;
  causaMorteAtestadoMedico: string;
  medicoResponsavelDeclaracaoNome?: string;
  medicoResponsavelDeclaracaoCRM?: string;
  localSepultamentoEnterro?: string;
  seraCreimado?: boolean;

  // Dados do Declarante
  declarante: DeclaranteObitoData;

  // Documentos Anexos
  declaracaoObitoUrl?: string; // DO
  documentoFalecidoUrl?: string;
  certidaoCasamentoNascimentoFalecidoUrl?: string;
}

// Para o estado da Server Action
export interface RegistroObitoActionState {
  message: string;
  status: "success" | "error";
  errors?: Record<string, string[] | undefined> | Partial<Record<keyof RegistroObitoFormData | string, string[]>> | null;
  data?: any;
}

