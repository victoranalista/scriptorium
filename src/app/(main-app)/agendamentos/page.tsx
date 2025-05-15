"use client";

import { useState, useEffect, startTransition, Suspense } from "react";
import { AgendamentoForm } from "@/app/features/agendamento/components/AgendamentoForm";
import { AgendamentoList } from "@/app/features/agendamento/components/AgendamentoList";
import { agendamentoService } from "@/app/features/agendamento/services";
import { Agendamento } from "@/app/features/agendamento/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CalendarDays } from "lucide-react";
import { toast } from "sonner";

export default function PaginaAgendamentos() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [agendamentosDoDia, setAgendamentosDoDia] = useState<Agendamento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchAgendamentos = async (date: Date) => {
    setIsLoading(true);
    try {
      const dateString = date.toISOString().split("T")[0];
      const data = await agendamentoService.listarAgendamentos({
        data: dateString,
      });
      setAgendamentosDoDia(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      toast.error("Falha ao carregar agendamentos.");
      setAgendamentosDoDia([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      startTransition(() => {
        fetchAgendamentos(selectedDate);
      });
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false); // Fecha o dialog
    if (selectedDate) {
      startTransition(() => {
        fetchAgendamentos(selectedDate); // Re-busca os agendamentos para o dia atual
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground min-h-screen">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <CalendarDays className="h-10 w-10 mr-3 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gerenciamento de Agendamentos
            </h1>
            <p className="text-lg text-muted-foreground">
              Visualize, crie e gerencie os agendamentos do cartório.
            </p>
          </div>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-background border-border">
            <DialogHeader>
              <DialogTitle>Criar Novo Agendamento</DialogTitle>
            </DialogHeader>
            <Suspense fallback={<div>Carregando formulário...</div>}>
              <AgendamentoForm
                onFormSubmit={handleFormSubmit}
                selectedDate={selectedDate}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1 bg-card text-card-foreground border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Calendário</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border border-border p-0"
              disabled={(date) =>
                date < new Date(new Date().setDate(new Date().getDate() - 1))
              } // Opcional: desabilitar datas passadas
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card text-card-foreground border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                Agendamentos para{" "}
                {selectedDate
                  ? selectedDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Nenhuma data selecionada"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground py-4">
                  Carregando agendamentos...
                </p>
              ) : (
                <Suspense
                  fallback={
                    <p className="text-center text-muted-foreground py-4">
                      Carregando lista...
                    </p>
                  }
                >
                  <AgendamentoList agendamentosIniciais={agendamentosDoDia} />
                </Suspense>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
