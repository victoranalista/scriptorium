"use client";

import { useState, useEffect, startTransition, Suspense } from "react";
import { UserForm } from "@/app/features/admin-usuarios/components/UserForm";
import { UserList } from "@/app/features/admin-usuarios/components/UserList";
import { adminUsuariosService } from "@/app/features/admin-usuarios/services";
import { User } from "@/app/features/admin-usuarios/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusCircle, Users, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function PaginaAdminUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await adminUsuariosService.listarUsuarios();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Falha ao carregar usuários.");
      setUsers([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    startTransition(() => {
      fetchUsers();
    });
  }, []);

  const handleOpenFormModal = (user?: User) => {
    setEditingUser(user || null);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (submittedUser?: User) => {
    setIsFormModalOpen(false);
    setEditingUser(null);
    toast.success(
      submittedUser
        ? "Usuário atualizado com sucesso!"
        : "Usuário criado com sucesso!"
    );
    startTransition(() => {
      fetchUsers(); // Re-busca os usuários para atualizar a lista
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground min-h-screen">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <ShieldCheck className="h-10 w-10 mr-3 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Administração de Usuários
            </h1>
            <p className="text-lg text-muted-foreground">
              Gerencie os funcionários e suas permissões de acesso.
            </p>
          </div>
        </div>
        <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenFormModal()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-background border-border">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar Usuário" : "Adicionar Novo Usuário"}
              </DialogTitle>
            </DialogHeader>
            <Suspense fallback={<div>Carregando formulário...</div>}>
              <UserForm user={editingUser} onFormSubmit={handleFormSubmit} />
            </Suspense>
          </DialogContent>
        </Dialog>
      </header>

      <div className="space-y-6">
        {isLoading && users.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-lg">
            Carregando usuários...
          </p>
        ) : (
          <Suspense
            fallback={
              <p className="text-center text-muted-foreground py-8 text-lg">
                Carregando lista de usuários...
              </p>
            }
          >
            <UserList
              initialUsers={users}
              onEditUser={handleOpenFormModal}
              onRefreshNeeded={fetchUsers}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
