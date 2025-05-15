import { User, UserFormData, UserProfile } from "./types";

// Simula um banco de dados em memória para os usuários
let users: User[] = [
  {
    id: "user-admin-01",
    nomeCompleto: "Administrador Master",
    email: "admin@cartorio.dev",
    perfil: "Admin",
    ativo: true,
    dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 dias atrás
    ultimoLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 horas atrás
  },
  {
    id: "user-oficial-01",
    nomeCompleto: "Oficial Registrador Silva",
    email: "oficial.silva@cartorio.dev",
    perfil: "Oficial",
    ativo: true,
    dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 dias atrás
    ultimoLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
  },
  {
    id: "user-escrevente-01",
    nomeCompleto: "Escrevente Souza",
    email: "escrevente.souza@cartorio.dev",
    perfil: "Escrevente",
    ativo: true,
    dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 dias atrás
    ultimoLogin: new Date().toISOString(), // Agora mesmo
  },
  {
    id: "user-escrevente-02",
    nomeCompleto: "Escrevente Pereira Inativo",
    email: "escrevente.pereira@cartorio.dev",
    perfil: "Escrevente",
    ativo: false,
    dataCriacao: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 dias atrás
  },
];

export const adminUsuariosService = {
  async listarUsuarios(filtros?: { perfil?: UserProfile; ativo?: boolean; nome?: string }): Promise<User[]> {
    console.log("Listando usuários com filtros:", filtros);
    let resultado = [...users];
    if (filtros?.perfil) {
      resultado = resultado.filter(user => user.perfil === filtros.perfil);
    }
    if (filtros?.ativo !== undefined) {
      resultado = resultado.filter(user => user.ativo === filtros.ativo);
    }
    if (filtros?.nome) {
      resultado = resultado.filter(user => user.nomeCompleto.toLowerCase().includes(filtros.nome!.toLowerCase()));
    }
    // Ordena por nome para melhor visualização
    resultado.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
    return resultado;
  },

  async buscarUsuarioPorId(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id);
    return user || null;
  },

  async criarUsuario(data: UserFormData): Promise<User> {
    console.log("Dados recebidos no serviço para criar usuário:", data);
    // Em um cenário real, a senha seria hasheada aqui antes de salvar.
    // E um email de boas-vindas/confirmação poderia ser enviado.
    const novoUsuario: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      nomeCompleto: data.nomeCompleto,
      email: data.email,
      perfil: data.perfil,
      ativo: data.ativo,
      dataCriacao: new Date().toISOString(),
    };
    users.push(novoUsuario);
    console.log("Usuário simulado criado:", novoUsuario);
    return novoUsuario;
  },

  async atualizarUsuario(id: string, data: Partial<UserFormData>): Promise<User | null> {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      // Atualiza apenas os campos fornecidos
      if (data.nomeCompleto !== undefined) users[index].nomeCompleto = data.nomeCompleto;
      if (data.email !== undefined) users[index].email = data.email;
      if (data.perfil !== undefined) users[index].perfil = data.perfil;
      if (data.ativo !== undefined) users[index].ativo = data.ativo;
      // Lógica para atualização de senha seria mais complexa (verificar senha atual, hashear nova, etc.)
      // Por ora, se uma nova senha for fornecida em 'data.senha', apenas logamos.
      if (data.senha) {
        console.log(`Simulando atualização de senha para o usuário ${id}. Nova senha (não hasheada): ${data.senha}`);
      }
      console.log(`Usuário ${id} atualizado.`);
      return users[index];
    }
    return null;
  },

  async deletarUsuario(id: string): Promise<boolean> {
    const tamanhoInicial = users.length;
    users = users.filter(u => u.id !== id);
    const deletado = users.length < tamanhoInicial;
    if (deletado) {
        console.log(`Usuário ${id} deletado.`);
    }
    return deletado;
  }
};

