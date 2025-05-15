export interface NatimortoData {
  nomeCompleto?: string; // Opcional, pois pode não ter nome
  sexo: "Masculino" | "Feminino" | "Ignorado" | "Indeterminado";
  dataEvento: string; // Data do parto/ocorrência
  horaEvento?: string; // HH:MM, opcional
  localOcorrencia: string; // Hospital, domicílio, etc.
  municipioOcorrencia: string;
  ufOcorrencia: string;
  tempoGestacaoSemanas?: number;
  tipoParto?: "Normal" | "Cesáreo" | "Fórceps" | "Ignorado";
  pesoAoNascerGramas?: number;
  causaMorteNatimorto?: string; // Causa provável ou constatada
}

export interface MaeNatimortoData {
  nomeCompleto: string;
  naturalidade?: string; // Cidade/UF
  nacionalidade?: string;
  profissao?: string;
  idadeEpocaParto?: number;
  cpf?: string;
  rg?: string;
  enderecoCompleto?: string;
  estadoCivil?: "Solteira" | "Casada" | "Divorciada" | "Viúva" | "União Estável" | "Não informado";
}

export interface PaiNatimortoData {
  nomeCompleto?: string;
  naturalidade?: string;
  nacionalidade?: string;
  profissao?: string;
  idadeEpocaParto?: number;
  cpf?: string;
  rg?: string;
  enderecoCompleto?: string;
  estadoCivil?: "Solteiro" | "Casado" | "Divorciado" | "Viúvo" | "União Estável" | "Não informado";
}

export interface DeclaranteNatimortoData {
  nomeCompleto: string;
  cpf?: string;
  rg?: string;
  vinculoComNatimortoOuPais: string;
  enderecoCompleto?: string;
}

export interface RegistroNatimortoFormData {
  natimorto: NatimortoData;
  mae: MaeNatimortoData;
  pai?: PaiNatimortoData; // Pai é opcional
  declarante: DeclaranteNatimortoData;
  // Documentos Anexos
  declaracaoObitoFetalUrl?: string; // DO Fetal
  documentosPaisUrl?: string;
  comprovanteResidenciaPaisUrl?: string;
}

// Para o estado da Server Action
export interface RegistroNatimortoActionState {
  message: string;
  status: "success" | "error";
  errors?: Record<string, string[] | undefined> | Partial<Record<keyof RegistroNatimortoFormData | string, string[]>> | null;
  data?: any;
}

