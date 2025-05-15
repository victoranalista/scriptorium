"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { AgendamentoSchema, AgendamentoFormData } from "../validation";
import { criarAgendamentoAction } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TipoAgendamento, AgendamentoActionState } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialState: AgendamentoActionState = {
  message: "",
  status: "error",
  errors: null,
  data: null,
};

const tiposAgendamentoOpcoes: { value: TipoAgendamento; label: string }[] = [
  { value: "CasamentoCivil", label: "Casamento Civil" },
  { value: "AtendimentoGeral", label: "Atendimento Geral" },
  { value: "ReconhecimentoFirma", label: "Reconhecimento de Firma" },
  { value: "Procuracao", label: "Procuração" },
  { value: "Outro", label: "Outro" },
];

interface AgendamentoFormProps {
  onFormSubmit?: () => void; // Callback para fechar dialog, por exemplo
  initialData?: Partial<AgendamentoFormData>; // Para edição futura
  selectedDate?: Date;
}

export function AgendamentoForm({ onFormSubmit, initialData, selectedDate }: AgendamentoFormProps) {
  const form = useForm<AgendamentoFormData>({
    resolver: zodResolver(AgendamentoSchema),
    defaultValues: {
      tipo: initialData?.tipo || undefined,
      data: initialData?.data || (selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
      hora: initialData?.hora || "",
      nomeSolicitantePrincipal: initialData?.nomeSolicitantePrincipal || "",
      cpfSolicitantePrincipal: initialData?.cpfSolicitantePrincipal || "",
      telefoneSolicitantePrincipal: initialData?.telefoneSolicitantePrincipal || "",
      emailSolicitantePrincipal: initialData?.emailSolicitantePrincipal || "",
      nomeSolicitanteSecundario: initialData?.nomeSolicitanteSecundario || "",
      observacoes: initialData?.observacoes || "",
    },
  });

  const [state, formAction] = useFormState(criarAgendamentoAction, initialState);

  // Resetar form e chamar callback em caso de sucesso
  if (state?.status === "success" && state.message) {
    form.reset();
    if (onFormSubmit) {
      onFormSubmit();
    }
  }

  return (
    <Card className="w-full bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Novo Agendamento</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Agendamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {tiposAgendamentoOpcoes.map(op => (
                        <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>{state?.errors?.tipo?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage>{state?.errors?.data?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora (HH:MM)</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage>{state?.errors?.hora?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="nomeSolicitantePrincipal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Solicitante Principal</FormLabel>
                  <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                  <FormMessage>{state?.errors?.nomeSolicitantePrincipal?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="cpfSolicitantePrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF (Opcional)</FormLabel>
                    <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                    <FormMessage>{state?.errors?.cpfSolicitantePrincipal?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefoneSolicitantePrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (Opcional)</FormLabel>
                    <FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl>
                    <FormMessage>{state?.errors?.telefoneSolicitantePrincipal?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailSolicitantePrincipal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Opcional)</FormLabel>
                    <FormControl><Input type="email" placeholder="email@exemplo.com" {...field} /></FormControl>
                    <FormMessage>{state?.errors?.emailSolicitantePrincipal?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="nomeSolicitanteSecundario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Solicitante Secundário (Opcional, ex: Cônjuge)</FormLabel>
                  <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                  <FormMessage>{state?.errors?.nomeSolicitanteSecundario?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl><Textarea placeholder="Detalhes adicionais sobre o agendamento..." {...field} rows={3} /></FormControl>
                  <FormMessage>{state?.errors?.observacoes?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {state?.message && (
              <p className={`${state.status === "success" ? "text-green-500" : "text-red-500"} text-sm mt-2`}>
                {state.message}
              </p>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {initialData?.data ? "Atualizar Agendamento" : "Criar Agendamento"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

