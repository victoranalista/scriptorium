"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useFormState } from "react-dom";
import { RegistroCasamentoSchema, RegistroCasamentoFormData } from "../validation";
import { criarRegistroCasamentoAction } from "../actions";
import { RegistroCasamentoActionState } from "../types";
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

const initialState: RegistroCasamentoActionState = {
  message: "",
  status: "error",
  errors: null,
};

// Helper para renderizar campos de um noivo/noiva
const NoivoFormSection = ({ control, errors, noivoIndex }: { control: any, errors: any, noivoIndex: "noivo1" | "noivo2" }) => {
  const prefix = `${noivoIndex}.`;
  return (
    <div className="space-y-4 p-4 border border-border rounded-md bg-card-foreground/5">
      <h4 className="text-md font-semibold">Dados do(a) Nubente {noivoIndex === "noivo1" ? 1 : 2}</h4>
      <FormField
        control={control}
        name={`${prefix}nomeCompleto`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
            <FormMessage>{errors?.[noivoIndex]?.nomeCompleto?.message}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}sexo`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecione o sexo" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                  <SelectItem value="Não informado">Não Informado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{errors?.[noivoIndex]?.sexo?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}nacionalidade`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidade</FormLabel>
              <FormControl><Input placeholder="Nacionalidade" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.nacionalidade?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}naturalidade`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naturalidade (Cidade/UF)</FormLabel>
              <FormControl><Input placeholder="Ex: São Paulo/SP" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.naturalidade?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}estadoCivilAnterior`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil Anterior</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                  <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                  <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                  <SelectItem value="Não informado">Não Informado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{errors?.[noivoIndex]?.estadoCivilAnterior?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}profissao`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão</FormLabel>
              <FormControl><Input placeholder="Profissão" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.profissao?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}idade`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl><Input type="number" placeholder="Idade" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.idade?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}cpf`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.cpf?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}rg`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl><Input placeholder="Número do RG" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.rg?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={`${prefix}enderecoCompleto`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço Completo</FormLabel>
            <FormControl><Input placeholder="Endereço completo" {...field} /></FormControl>
            <FormMessage>{errors?.[noivoIndex]?.enderecoCompleto?.message}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}nomePai`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Pai</FormLabel>
              <FormControl><Input placeholder="Nome completo do pai" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.nomePai?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}nomeMae`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Mãe</FormLabel>
              <FormControl><Input placeholder="Nome completo da mãe" {...field} /></FormControl>
              <FormMessage>{errors?.[noivoIndex]?.nomeMae?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
       {/* Campos de Upload para Noivo */}
      <FormField
        control={control}
        name={`${prefix}documentoIdentificacaoUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Documento de Identificação (Upload)</FormLabel>
            <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
            <FormDescription>Anexe o documento de identificação.</FormDescription>
            <FormMessage>{errors?.[noivoIndex]?.documentoIdentificacaoUrl?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${prefix}certidaoNascimentoCasamentoUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certidão de Nascimento/Casamento com Averbação (Upload)</FormLabel>
            <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
            <FormDescription>Anexe a certidão.</FormDescription>
            <FormMessage>{errors?.[noivoIndex]?.certidaoNascimentoCasamentoUrl?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};

// Helper para renderizar campos de uma testemunha
const TestemunhaFormSection = ({ control, errors, testemunhaIndex }: { control: any, errors: any, testemunhaIndex: "testemunha1" | "testemunha2" }) => {
  const prefix = `${testemunhaIndex}.`;
  return (
    <div className="space-y-4 p-4 border border-border rounded-md bg-card-foreground/5">
      <h4 className="text-md font-semibold">Dados da Testemunha {testemunhaIndex === "testemunha1" ? 1 : 2} (Habilitação)</h4>
      <FormField
        control={control}
        name={`${prefix}nomeCompleto`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl><Input placeholder="Nome completo da testemunha" {...field} /></FormControl>
            <FormMessage>{errors?.[testemunhaIndex]?.nomeCompleto?.message}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}rg`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl><Input placeholder="RG da testemunha" {...field} /></FormControl>
              <FormMessage>{errors?.[testemunhaIndex]?.rg?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}cpf`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl><Input placeholder="CPF da testemunha" {...field} /></FormControl>
              <FormMessage>{errors?.[testemunhaIndex]?.cpf?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={`${prefix}enderecoCompleto`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço Completo</FormLabel>
            <FormControl><Input placeholder="Endereço da testemunha" {...field} /></FormControl>
            <FormMessage>{errors?.[testemunhaIndex]?.enderecoCompleto?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${prefix}profissao`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profissão (Opcional)</FormLabel>
            <FormControl><Input placeholder="Profissão da testemunha" {...field} /></FormControl>
            <FormMessage>{errors?.[testemunhaIndex]?.profissao?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};

export function RegistroCasamentoForm() {
  const form = useForm<RegistroCasamentoFormData>({
    resolver: zodResolver(RegistroCasamentoSchema),
    defaultValues: {
      noivo1: { nomeCompleto: "", nacionalidade: "Brasileira", naturalidade: "", estadoCivilAnterior: undefined, profissao: "", idade: undefined, cpf: "", rg: "", enderecoCompleto: "", nomePai: "", nomeMae: "", sexo: undefined },
      noivo2: { nomeCompleto: "", nacionalidade: "Brasileira", naturalidade: "", estadoCivilAnterior: undefined, profissao: "", idade: undefined, cpf: "", rg: "", enderecoCompleto: "", nomePai: "", nomeMae: "", sexo: undefined },
      testemunha1: { nomeCompleto: "", rg: "", cpf: "", enderecoCompleto: "", profissao: "" },
      testemunha2: { nomeCompleto: "", rg: "", cpf: "", enderecoCompleto: "", profissao: "" },
      regimeBens: undefined,
      dataProvavelCerimonia: "",
      dataCelebracao: "",
      localCelebracao: "",
      nomeCelebrante: "",
      testemunhaCerimonia1Nome: "",
      testemunhaCerimonia2Nome: "",
      nomeAdotadoNoivo1: "",
      nomeAdotadoNoivo2: "",
      pactoAntenupcialUrl: "",
      comprovanteResidenciaNoivosUrl: "",
    },
  });

  const [state, formAction] = useFormState(criarRegistroCasamentoAction, initialState);
  const { errors } = state || {}; // Extrair erros do estado da action

  return (
    <Card className="w-full max-w-5xl mx-auto my-8 bg-background text-foreground border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registro de Casamento</CardTitle>
        <CardDescription>Preencha os dados para habilitação e celebração do casamento.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* Habilitação */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b border-border pb-2">Fase de Habilitação</h3>
              <NoivoFormSection control={form.control} errors={errors} noivoIndex="noivo1" />
              <Separator className="my-4 bg-border" />
              <NoivoFormSection control={form.control} errors={errors} noivoIndex="noivo2" />
              <Separator className="my-4 bg-border" />
              <TestemunhaFormSection control={form.control} errors={errors} testemunhaIndex="testemunha1" />
              <Separator className="my-4 bg-border" />
              <TestemunhaFormSection control={form.control} errors={errors} testemunhaIndex="testemunha2" />
              
              <Separator className="my-6 bg-border" />
              <h4 className="text-md font-semibold">Regime de Bens e Data Provável</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="regimeBens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regime de Bens</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione o regime" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Comunhão Parcial de Bens">Comunhão Parcial de Bens</SelectItem>
                          <SelectItem value="Comunhão Universal de Bens">Comunhão Universal de Bens</SelectItem>
                          <SelectItem value="Separação Total de Bens">Separação Total de Bens</SelectItem>
                          <SelectItem value="Participação Final nos Aquestos">Participação Final nos Aquestos</SelectItem>
                          <SelectItem value="Separação Obrigatória de Bens">Separação Obrigatória de Bens</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors?.regimeBens?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataProvavelCerimonia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Provável da Cerimônia</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage>{errors?.dataProvavelCerimonia?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="pactoAntenupcialUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pacto Antenupcial (Upload, se houver)</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe o pacto antenupcial, se aplicável.</FormDescription>
                    <FormMessage>{errors?.pactoAntenupcialUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-8 bg-border" />

            {/* Celebração */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold border-b border-border pb-2">Fase de Celebração</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataCelebracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Celebração</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage>{errors?.dataCelebracao?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localCelebracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local da Celebração</FormLabel>
                      <FormControl><Input placeholder="Local da cerimônia" {...field} /></FormControl>
                      <FormMessage>{errors?.localCelebracao?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="nomeCelebrante"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Celebrante</FormLabel>
                    <FormControl><Input placeholder="Nome do juiz, religioso, etc." {...field} /></FormControl>
                    <FormMessage>{errors?.nomeCelebrante?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="testemunhaCerimonia1Nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Testemunha da Cerimônia 1 (Opcional)</FormLabel>
                      <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                      <FormMessage>{errors?.testemunhaCerimonia1Nome?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="testemunhaCerimonia2Nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Testemunha da Cerimônia 2 (Opcional)</FormLabel>
                      <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                      <FormMessage>{errors?.testemunhaCerimonia2Nome?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nomeAdotadoNoivo1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Adotado pelo(a) Nubente 1 (Se houver alteração)</FormLabel>
                      <FormControl><Input placeholder="Novo nome completo" {...field} /></FormControl>
                      <FormMessage>{errors?.nomeAdotadoNoivo1?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomeAdotadoNoivo2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Adotado pelo(a) Nubente 2 (Se houver alteração)</FormLabel>
                      <FormControl><Input placeholder="Novo nome completo" {...field} /></FormControl>
                      <FormMessage>{errors?.nomeAdotadoNoivo2?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Separator className="my-8 bg-border" />

            {/* Documentos Gerais */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold border-b border-border pb-2">Documentos Adicionais</h3>
                <FormField
                    control={form.control}
                    name="comprovanteResidenciaNoivosUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Comprovante de Residência dos Noivos (Upload)</FormLabel>
                        <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                        <FormDescription>Anexe um comprovante de residência comum ou de ambos.</FormDescription>
                        <FormMessage>{errors?.comprovanteResidenciaNoivosUrl?.message}</FormMessage>
                    </FormItem>
                    )}
                />
            </section>

            {state?.message && (
              <p className={`${state.status === "success" ? "text-green-500" : "text-red-500"} text-sm mt-4`}>
                {state.message}
              </p>
            )}
            {/* Exibir erros de validação globais ou específicos não cobertos pelos FormField */}
            {state?.errors && typeof state.errors === "object" && Object.keys(state.errors).length > 0 && (
              <div className="text-red-500 text-sm mt-4">
                <p>Por favor, corrija os seguintes erros:</p>
                <ul>
                  {Object.entries(state.errors).map(([key, fieldErrors]) => {
                    if (typeof fieldErrors === "object" && fieldErrors && "_errors" in fieldErrors && Array.isArray(fieldErrors._errors)) {
                        return fieldErrors._errors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${key}: ${errorMsg}`}</li>
                        ));
                    } else if (Array.isArray(fieldErrors)) {
                        return fieldErrors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${key}: ${errorMsg}`}</li>
                        ));
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrar Casamento
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

