"use client";

import { useState, useEffect, startTransition } from "react";
import { Agendamento, TipoAgendamento } from "../types";
import {
  agendamentoService,
} from "../services";
import {
  atualizarStatusAgendamentoAction,
  deletarAgendamentoAction } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "sonner"; // Assumindo que sonner está configurado para toasts
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit3, CheckCircle, XCircle, Clock } from "lucide-react";

interface AgendamentoListProps {
  agendamentosIniciais: Agendamento[];
  onEditAgendamento?: (agendamento: Agendamento) => void; // Para abrir formulário de edição
}

const statusOptions: Agendamento["status"][] = [
  "Pendente",
  "Confirmado",
  "Cancelado",
  "Realizado",
];

const getStatusBadgeVariant = (status: Agendamento["status"]) => {
  switch (status) {
    case "Confirmado":
      return "success";
    case "Pendente":
      return "secondary";
    case "Cancelado":
      return "destructive";
    case "Realizado":
      return "default";
    default:
      return "outline";
  }
};

const getStatusIcon = (status: Agendamento["status"]) => {
  switch (status) {
    case "Confirmado":
      return <CheckCircle className="h-4 w-4 mr-1 text-green-500" />;
    case "Pendente":
      return <Clock className="h-4 w-4 mr-1 text-yellow-500" />;
    case "Cancelado":
      return <XCircle className="h-4 w-4 mr-1 text-red-500" />;
    case "Realizado":
      return <CheckCircle className="h-4 w-4 mr-1 text-blue-500" />;
    default:
      return null;
  }
};

export function AgendamentoList({
  agendamentosIniciais,
  onEditAgendamento,
}: AgendamentoListProps) {
  const [agendamentos, setAgendamentos] =
    useState<Agendamento[]>(agendamentosIniciais);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAgendamentos(agendamentosIniciais);
  }, [agendamentosIniciais]);

  const handleStatusChange = async (
    id: string,
    novoStatus: Agendamento["status"]
  ) => {
    setIsLoading(true);
    startTransition(async () => {
      const result = await atualizarStatusAgendamentoAction(id, novoStatus);
      if (result.status === "success" && result.data) {
        setAgendamentos((prev) =>
          prev.map((ag) =>
            ag.id === id
              ? {
                  ...ag,
                  status: novoStatus,
                  dataAtualizacao: new Date().toISOString(),
                }
              : ag
          )
        );
        toast.success(result.message || "Status atualizado com sucesso!");
      } else {
        toast.error(result.message || "Erro ao atualizar status.");
      }
      setIsLoading(false);
    });
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    startTransition(async () => {
      const result = await deletarAgendamentoAction(id);
      if (result.status === "success") {
        setAgendamentos((prev) => prev.filter((ag) => ag.id !== id));
        toast.success(result.message || "Agendamento deletado com sucesso!");
      } else {
        toast.error(result.message || "Erro ao deletar agendamento.");
      }
      setIsLoading(false);
    });
  };

  if (!agendamentos || agendamentos.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-4">
        Nenhum agendamento encontrado para a data selecionada.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-card text-card-foreground border-border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Data</TableHead>
            <TableHead className="w-[100px]">Hora</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Solicitante Principal</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead className="text-right w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendamentos.map((ag) => (
            <TableRow key={ag.id} className="hover:bg-muted/50">
              <TableCell>
                {new Date(ag.data + "T00:00:00").toLocaleDateString()}
              </TableCell>
              <TableCell>{ag.hora}</TableCell>
              <TableCell>
                {ag.tipo.replace(/([A-Z])/g, " $1").trim()}
              </TableCell>{" "}
              {/* Formata tipo para leitura */}
              <TableCell>{ag.nomeSolicitantePrincipal}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getStatusIcon(ag.status)}
                  <Select
                    defaultValue={ag.status}
                    onValueChange={(newStatus) =>
                      handleStatusChange(
                        ag.id,
                        newStatus as Agendamento["status"]
                      )
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className={`w-full h-8 text-xs ${
                        getStatusBadgeVariant(ag.status) === "success"
                          ? "border-green-500"
                          : getStatusBadgeVariant(ag.status) === "destructive"
                          ? "border-red-500"
                          : "border-border"
                      }`}
                    >
                      <SelectValue placeholder="Mudar status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt} value={opt} className="text-xs">
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {onEditAgendamento && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditAgendamento(ag)}
                    className="mr-2 hover:text-primary"
                    disabled={isLoading}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-destructive"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir o agendamento de "
                        {ag.nomeSolicitantePrincipal}" para{" "}
                        {new Date(ag.data + "T00:00:00").toLocaleDateString()}{" "}
                        às {ag.hora}? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-border hover:bg-muted">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(ag.id)}
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
  );
}
