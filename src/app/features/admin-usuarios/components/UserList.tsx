"use client";

import { useState, useEffect, startTransition } from "react";
import { User, UserProfile } from "../types";
import { adminUsuariosService  } from "../services"; 
import { deletarUsuarioAction } from "../actions"
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, Edit3, UserCheck, UserX, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

interface UserListProps {
  initialUsers: User[];
  onEditUser: (user: User) => void;
  onRefreshNeeded: () => void; 
}

const perfilOptions: UserProfile[] = ["Admin", "Oficial", "Escrevente"];

export function UserList({
  initialUsers,
  onEditUser,
  onRefreshNeeded,
}: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [filterNome, setFilterNome] = useState("");
  const [filterPerfil, setFilterPerfil] = useState<UserProfile | "">("");
  const [filterAtivo, setFilterAtivo] = useState<
    "todos" | "ativos" | "inativos"
  >("todos");

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleFilter = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await adminUsuariosService.listarUsuarios({
        nome: filterNome || undefined,
        perfil: filterPerfil || undefined,
        ativo:
          filterAtivo === "ativos"
            ? true
            : filterAtivo === "inativos"
            ? false
            : undefined,
      });
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error("Erro ao filtrar usuários.");
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, nome: string) => {
    setIsLoading(true);
    startTransition(async () => {
      const result = await deletarUsuarioAction(id);
      if (result.status === "success") {
        setUsers(prev => prev.filter(u => u.id !== id));
        onRefreshNeeded(); 
        toast.success(
          result.message || `Usuário ${nome} deletado com sucesso!`
        );
      } else {
        toast.error(result.message || "Erro ao deletar usuário.");
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-5 w-5" /> Filtros de Busca
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            placeholder="Nome do usuário..."
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            className="bg-input"
          />
          <Select
            value={filterPerfil}
            onValueChange={(value) => setFilterPerfil(value as UserProfile)}
          >
            <SelectTrigger className="bg-input">
              <SelectValue placeholder="Todos os Perfis" />
            </SelectTrigger>
            <SelectContent>
              {perfilOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filterAtivo}
            onValueChange={(value) =>
              setFilterAtivo(value as "todos" | "ativos" | "inativos")
            }
          >
            <SelectTrigger className="bg-input">
              <SelectValue placeholder="Status (Todos)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Status (Todos)</SelectItem>
              <SelectItem value="ativos">Ativos</SelectItem>
              <SelectItem value="inativos">Inativos</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleFilter}
            disabled={isLoading}
            className="w-full sm:w-auto md:col-start-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? "Filtrando..." : "Aplicar Filtros"}
          </Button>
        </CardContent>
      </Card>

      {isLoading && users.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          Carregando usuários...
        </p>
      )}
      {!isLoading && users.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          Nenhum usuário encontrado com os filtros aplicados.
        </p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table className="min-w-full bg-card text-card-foreground">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px]">Nome Completo</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[120px]">Perfil</TableHead>
                <TableHead className="w-[100px] text-center">Status</TableHead>
                <TableHead className="w-[180px]">Último Login</TableHead>
                <TableHead className="text-right w-[120px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/80">
                  <TableCell className="font-medium">
                    {user.nomeCompleto}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.perfil === "Admin"
                          ? "destructive"
                          : user.perfil === "Oficial"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {user.perfil}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {user.ativo ? (
                      <Badge variant="secondary" className="text-xs">
                        <UserCheck className="inline h-3 w-3 mr-1" /> Ativo
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <UserX className="inline h-3 w-3 mr-1" /> Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.ultimoLogin
                      ? new Date(user.ultimoLogin).toLocaleString("pt-BR")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditUser(user)}
                      className="mr-2 hover:text-primary"
                      disabled={isLoading}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-destructive"
                          disabled={
                            isLoading ||
                            user.perfil ===
                              "Admin" /* Não permitir deletar Admin Master */
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-background border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar Exclusão
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o usuário "
                            {user.nomeCompleto}"? Esta ação não pode ser
                            desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-border hover:bg-muted">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDelete(user.id, user.nomeCompleto)
                            }
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            disabled={isLoading}
                          >
                            {isLoading ? "Excluindo..." : "Excluir"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
