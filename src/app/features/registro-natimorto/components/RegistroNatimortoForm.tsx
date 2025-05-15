"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { RegistroNatimortoSchema, RegistroNatimortoFormData } from "../validation";
import { criarRegistroNatimortoAction} from "../actions";
import { RegistroNatimortoActionState } from "../types";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const initialState: RegistroNatimortoActionState = {
  message: "",
  status: "error",
  errors: null,
};

export function RegistroNatimortoForm() {
  const form = useForm<RegistroNatimortoFormData>({
    resolver: zodResolver(RegistroNatimortoSchema),
    defaultValues: {
      natimorto: {
        nomeCompleto: "",
        sexo: undefined,
        dataEvento: "",
        horaEvento: "",
        localOcorrencia: "",
        municipioOcorrencia: "",
        ufOcorrencia: "",
        tempoGestacaoSemanas: undefined,
        tipoParto: undefined,
        pesoAoNascerGramas: undefined,
        causaMorteNatimorto: "",
      },
      mae: {
        nomeCompleto: "",
        naturalidade: "",
        nacionalidade: "Brasileira",
        profissao: "",
        idadeEpocaParto: undefined,
        cpf: "",
        rg: "",
        enderecoCompleto: "",
        estadoCivil: undefined,
      },
      pai: {
        nomeCompleto: "",
        naturalidade: "",
        nacionalidade: "Brasileira",
        profissao: "",
        idadeEpocaParto: undefined,
        cpf: "",
        rg: "",
        enderecoCompleto: "",
        estadoCivil: undefined,
      },
      declarante: {
        nomeCompleto: "",
        cpf: "",
        rg: "",
        vinculoComNatimortoOuPais: "",
        enderecoCompleto: "",
      },
      declaracaoObitoFetalUrl: "",
      documentosPaisUrl: "",
      comprovanteResidenciaPaisUrl: "",
    },
  });

  const [state, formAction] = useFormState(criarRegistroNatimortoAction, initialState);
  const { errors } = state || {};

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 bg-background text-foreground border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registro de Natimorto</CardTitle>
        <CardDescription>Preencha os dados abaixo para registrar o natimorto.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* Dados do Natimorto */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados do Natimorto</h3>
              <FormField
                control={form.control}
                name="natimorto.nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo (se houver)</FormLabel>
                    <FormControl><Input placeholder="Nome do natimorto, se houver" {...field} /></FormControl>
                    <FormMessage>{errors?.natimorto?.nomeCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="natimorto.sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                          <SelectItem value="Indeterminado">Indeterminado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors?.natimorto?.sexo?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="natimorto.dataEvento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do Evento (Parto/Ocorrência)</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage>{errors?.natimorto?.dataEvento?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="natimorto.horaEvento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora do Evento (HH:MM, opcional)</FormLabel>
                      <FormControl><Input type="time" {...field} /></FormControl>
                      <FormMessage>{errors?.natimorto?.horaEvento?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="natimorto.localOcorrencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local de Ocorrência</FormLabel>
                      <FormControl><Input placeholder="Hospital, domicílio, etc." {...field} /></FormControl>
                      <FormMessage>{errors?.natimorto?.localOcorrencia?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="natimorto.municipioOcorrencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Município de Ocorrência</FormLabel>
                      <FormControl><Input placeholder="Município" {...field} /></FormControl>
                      <FormMessage>{errors?.natimorto?.municipioOcorrencia?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="natimorto.ufOcorrencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF de Ocorrência</FormLabel>
                      <FormControl><Input placeholder="UF" maxLength={2} {...field} /></FormControl>
                      <FormMessage>{errors?.natimorto?.ufOcorrencia?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="natimorto.tempoGestacaoSemanas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de Gestação (Semanas)</FormLabel>
                      <FormControl><Input type="number" placeholder="Semanas" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} /></FormControl>
                      <FormMessage>{errors?.natimorto?.tempoGestacaoSemanas?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="natimorto.tipoParto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Parto</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Cesáreo">Cesáreo</SelectItem>
                          <SelectItem value="Fórceps">Fórceps</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors?.natimorto?.tipoParto?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="natimorto.pesoAoNascerGramas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso ao Nascer (Gramas)</FormLabel>
                      <FormControl><Input type="number" placeholder="Gramas" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} /></FormControl>
                      <FormMessage>{errors?.natimorto?.pesoAoNascerGramas?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="natimorto.causaMorteNatimorto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Causa da Morte do Natimorto (Provável/Constatada)</FormLabel>
                    <FormControl><Input placeholder="Descrição da causa da morte" {...field} /></FormControl>
                    <FormMessage>{errors?.natimorto?.causaMorteNatimorto?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            {/* Dados da Mãe */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados da Mãe</h3>
              <FormField
                control={form.control}
                name="mae.nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo da Mãe</FormLabel>
                    <FormControl><Input placeholder="Nome completo da mãe" {...field} /></FormControl>
                    <FormMessage>{errors?.mae?.nomeCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="mae.naturalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade (Cidade/UF)</FormLabel>
                      <FormControl><Input placeholder="Ex: São Paulo/SP" {...field} /></FormControl>
                      <FormMessage>{errors?.mae?.naturalidade?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mae.nacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl><Input placeholder="Nacionalidade" {...field} /></FormControl>
                      <FormMessage>{errors?.mae?.nacionalidade?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mae.profissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl><Input placeholder="Profissão" {...field} /></FormControl>
                      <FormMessage>{errors?.mae?.profissao?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="mae.idadeEpocaParto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade na Época do Parto</FormLabel>
                      <FormControl><Input type="number" placeholder="Idade" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} /></FormControl>
                      <FormMessage>{errors?.mae?.idadeEpocaParto?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mae.cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                      <FormMessage>{errors?.mae?.cpf?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mae.rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl><Input placeholder="Número do RG" {...field} /></FormControl>
                      <FormMessage>{errors?.mae?.rg?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="mae.enderecoCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço Completo</FormLabel>
                    <FormControl><Input placeholder="Endereço completo" {...field} /></FormControl>
                    <FormMessage>{errors?.mae?.enderecoCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mae.estadoCivil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado Civil</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Solteira">Solteira</SelectItem>
                        <SelectItem value="Casada">Casada</SelectItem>
                        <SelectItem value="Divorciada">Divorciada</SelectItem>
                        <SelectItem value="Viúva">Viúva</SelectItem>
                        <SelectItem value="União Estável">União Estável</SelectItem>
                        <SelectItem value="Não informado">Não Informado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors?.mae?.estadoCivil?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            {/* Dados do Pai (Opcional) */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados do Pai (Opcional)</h3>
               <FormField
                control={form.control}
                name="pai.nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo do Pai</FormLabel>
                    <FormControl><Input placeholder="Nome completo do pai (se houver)" {...field} /></FormControl>
                    <FormMessage>{errors?.pai?.nomeCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="pai.naturalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade (Cidade/UF)</FormLabel>
                      <FormControl><Input placeholder="Ex: Rio de Janeiro/RJ" {...field} /></FormControl>
                      <FormMessage>{errors?.pai?.naturalidade?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pai.nacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl><Input placeholder="Nacionalidade" {...field} /></FormControl>
                      <FormMessage>{errors?.pai?.nacionalidade?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pai.profissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl><Input placeholder="Profissão" {...field} /></FormControl>
                      <FormMessage>{errors?.pai?.profissao?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="pai.idadeEpocaParto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade na Época do Parto</FormLabel>
                      <FormControl><Input type="number" placeholder="Idade" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} /></FormControl>
                      <FormMessage>{errors?.pai?.idadeEpocaParto?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pai.cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                      <FormMessage>{errors?.pai?.cpf?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pai.rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl><Input placeholder="Número do RG" {...field} /></FormControl>
                      <FormMessage>{errors?.pai?.rg?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="pai.enderecoCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço Completo</FormLabel>
                    <FormControl><Input placeholder="Endereço completo" {...field} /></FormControl>
                    <FormMessage>{errors?.pai?.enderecoCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pai.estadoCivil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado Civil</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Solteiro">Solteiro</SelectItem>
                        <SelectItem value="Casado">Casado</SelectItem>
                        <SelectItem value="Divorciado">Divorciado</SelectItem>
                        <SelectItem value="Viúvo">Viúvo</SelectItem>
                        <SelectItem value="União Estável">União Estável</SelectItem>
                        <SelectItem value="Não informado">Não Informado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors?.pai?.estadoCivil?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            {/* Dados do Declarante */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados do Declarante</h3>
              <FormField
                control={form.control}
                name="declarante.nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo do Declarante</FormLabel>
                    <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                    <FormMessage>{errors?.declarante?.nomeCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="declarante.cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF do Declarante</FormLabel>
                      <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                      <FormMessage>{errors?.declarante?.cpf?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="declarante.rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG do Declarante</FormLabel>
                      <FormControl><Input placeholder="Número do RG" {...field} /></FormControl>
                      <FormMessage>{errors?.declarante?.rg?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="declarante.vinculoComNatimortoOuPais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vínculo com o Natimorto ou Pais</FormLabel>
                      <FormControl><Input placeholder="Ex: Pai, Mãe, Médico, Responsável" {...field} /></FormControl>
                      <FormMessage>{errors?.declarante?.vinculoComNatimortoOuPais?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="declarante.enderecoCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço Completo do Declarante</FormLabel>
                    <FormControl><Input placeholder="Endereço completo" {...field} /></FormControl>
                    <FormMessage>{errors?.declarante?.enderecoCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            {/* Documentos Anexos */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Documentos Anexos</h3>
              <FormField
                control={form.control}
                name="declaracaoObitoFetalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Declaração de Óbito Fetal (DO Fetal) - Upload</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe o arquivo digitalizado da DO Fetal.</FormDescription>
                    <FormMessage>{errors?.declaracaoObitoFetalUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentosPaisUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documentos dos Pais - Upload</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe os documentos de identificação dos pais.</FormDescription>
                    <FormMessage>{errors?.documentosPaisUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comprovanteResidenciaPaisUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprovante de Residência dos Pais - Upload</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe um comprovante de residência recente dos pais.</FormDescription>
                    <FormMessage>{errors?.comprovanteResidenciaPaisUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            {state?.message && (
              <p className={`${state.status === "success" ? "text-green-500" : "text-red-500"} text-sm mt-4`}>
                {state.message}
              </p>
            )}
            {state?.errors && typeof state.errors === "object" && Object.keys(state.errors).length > 0 && (
               <div className="text-red-500 text-sm mt-4">
                 <p>Por favor, corrija os seguintes erros:</p>
                 <ul>
                  {Object.entries(state.errors).map(([key, fieldErrors]) => {
                    const keyLabel = key.replace("natimorto.", "Natimorto: ").replace("mae.", "Mãe: ").replace("pai.", "Pai: ").replace("declarante.", "Declarante: ");
                    if (typeof fieldErrors === "object" && fieldErrors && "_errors" in fieldErrors && Array.isArray(fieldErrors._errors)) {
                        return fieldErrors._errors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${keyLabel}: ${errorMsg}`}</li>
                        ));
                    } else if (Array.isArray(fieldErrors)) { 
                        return fieldErrors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${keyLabel}: ${errorMsg}`}</li>
                        ));
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrar Natimorto
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

