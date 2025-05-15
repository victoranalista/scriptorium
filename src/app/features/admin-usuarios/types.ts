export type UserProfile = "Escrevente" | "Oficial" | "Admin";

export interface User {
  id: string;
  nomeCompleto: string;
  email: string;
  perfil: UserProfile;
  ativo: boolean;
  dataCriacao: string; 
  ultimoLogin?: string; 
}

export interface UserFormData {
  nomeCompleto: string;
  email: string;
  perfil: UserProfile;
  ativo: boolean;
  senha?: string; // Opcional, apenas para criação ou reset
}

export interface UserActionState {
  message: string;
  status: "success" | "error";
  errors?: Partial<Record<keyof UserFormData | string, string[]>> | null;
  data?: User | null;
}

