"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "react-dom";
import { RegistroUniaoEstavelSchema, RegistroUniaoEstavelFormData } from "../validation";
import { criarRegistroUniaoEstavelAction } from "../actions";
import { RegistroUniaoEstavelActionState } from "../types";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

const initialState: RegistroUniaoEstavelActionState = {
  message: "",
  status: "error",
  errors: null,
};

// Helper para renderizar campos de um convivente
const ConviventeFormSection = ({ control, errors, conviventeIndex }: { control: any, errors: any, conviventeIndex: "convivente1" | "convivente2" }) => {
  const prefix = `${conviventeIndex}.`;
  return (
    <div className="space-y-4 p-4 border border-border rounded-md bg-card-foreground/5">
      <h4 className="text-md font-semibold">Dados do(a) Convivente {conviventeIndex === "convivente1" ? 1 : 2}</h4>
      <FormField
        control={control}
        name={`${prefix}nomeCompleto`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
            <FormMessage>{errors?.[conviventeIndex]?.nomeCompleto?.message}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}nacionalidade`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidade</FormLabel>
              <FormControl><Input placeholder="Nacionalidade" {...field} /></FormControl>
              <FormMessage>{errors?.[conviventeIndex]?.nacionalidade?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}profissao`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão</FormLabel>
              <FormControl><Input placeholder="Profissão" {...field} /></FormControl>
              <FormMessage>{errors?.[conviventeIndex]?.profissao?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}estadoCivil`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                  <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                  <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                  <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                  <SelectItem value="Separado(a) Judicialmente">Separado(a) Judicialmente</SelectItem>
                  <SelectItem value="Não informado">Não Informado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{errors?.[conviventeIndex]?.estadoCivil?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}dataNascimento`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage>{errors?.[conviventeIndex]?.dataNascimento?.message}</FormMessage>
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
              <FormMessage>{errors?.[conviventeIndex]?.cpf?.message}</FormMessage>
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
              <FormMessage>{errors?.[conviventeIndex]?.rg?.message}</FormMessage>
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
            <FormMessage>{errors?.[conviventeIndex]?.enderecoCompleto?.message}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`${prefix}nomePai`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Pai (Opcional)</FormLabel>
              <FormControl><Input placeholder="Nome completo do pai" {...field} /></FormControl>
              <FormMessage>{errors?.[conviventeIndex]?.nomePai?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${prefix}nomeMae`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Mãe (Opcional)</FormLabel>
              <FormControl><Input placeholder="Nome completo da mãe" {...field} /></FormControl>
              <FormMessage>{errors?.[conviventeIndex]?.nomeMae?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      {/* Adicionar campos de upload para documentosConvivente1Urls e documentosConvivente2Urls aqui se necessário */}
    </div>
  );
};

// Helper para renderizar campos de uma testemunha (opcional)
const TestemunhaUniaoEstavelFormSection = ({ control, errors, testemunhaIndex }: { control: any, errors: any, testemunhaIndex: "testemunha1" | "testemunha2" }) => {
  const prefix = `${testemunhaIndex}.`;
  return (
    <div className="space-y-4 p-4 border border-border rounded-md bg-card-foreground/5">
      <h4 className="text-md font-semibold">Dados da Testemunha {testemunhaIndex === "testemunha1" ? 1 : 2} (Opcional)</h4>
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

export function RegistroUniaoEstavelForm() {
  const form = useForm<RegistroUniaoEstavelFormData>({
    resolver: zodResolver(RegistroUniaoEstavelSchema),
    defaultValues: {
      convivente1: { nomeCompleto: "", nacionalidade: "Brasileira", profissao: "", estadoCivil: undefined, cpf: "", rg: "", enderecoCompleto: "", dataNascimento: "", nomePai: "", nomeMae: "" },
      convivente2: { nomeCompleto: "", nacionalidade: "Brasileira", profissao: "", estadoCivil: undefined, cpf: "", rg: "", enderecoCompleto: "", dataNascimento: "", nomePai: "", nomeMae: "" },
      dataInicioConvivencia: "",
      regimeBens: undefined,
      declaracaoVontadeConjunta: false,
      filhosComuns: [],
      testemunha1: { nomeCompleto: "", rg: "", cpf: "", enderecoCompleto: "", profissao: "" }, // Inicializar mesmo opcionais para evitar problemas de controlled/uncontrolled
      testemunha2: { nomeCompleto: "", rg: "", cpf: "", enderecoCompleto: "", profissao: "" },
      pactoRegimeBensUrl: "",
      comprovanteResidenciaComumUrl: "",
      dataRegistro: new Date().toISOString().split('T')[0], // Preenche com data atual
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "filhosComuns",
  });

  const [state, formAction] = useFormState(criarRegistroUniaoEstavelAction, initialState);
  const { errors } = state || {};

  return (
    <Card className="w-full max-w-5xl mx-auto my-8 bg-background text-foreground border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registro de União Estável</CardTitle>
        <CardDescription>Preencha os dados para registrar a união estável.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <ConviventeFormSection control={form.control} errors={errors} conviventeIndex="convivente1" />
            <Separator className="my-6 bg-border" />
            <ConviventeFormSection control={form.control} errors={errors} conviventeIndex="convivente2" />
            
            <Separator className="my-8 bg-border" />

            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Detalhes da União</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataInicioConvivencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Início da Convivência (Opcional)</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage>{errors?.dataInicioConvivencia?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="regimeBens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regime de Bens (Opcional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione o regime" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Comunhão Parcial de Bens">Comunhão Parcial de Bens</SelectItem>
                          <SelectItem value="Comunhão Universal de Bens">Comunhão Universal de Bens</SelectItem>
                          <SelectItem value="Separação Total de Bens">Separação Total de Bens</SelectItem>
                          <SelectItem value="Participação Final nos Aquestos">Participação Final nos Aquestos</SelectItem>
                          <SelectItem value="Não especificado">Não Especificado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors?.regimeBens?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="declaracaoVontadeConjunta"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 shadow">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Declaração de Vontade Conjunta</FormLabel>
                      <FormDescription>
                        Ambos declaram a vontade de constituir união estável.
                      </FormDescription>
                    </div>
                    <FormMessage>{errors?.declaracaoVontadeConjunta?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Filhos em Comum (Opcional)</h3>
              {fields.map((item, index) => (
                <div key={item.id} className="p-4 border border-border rounded-md space-y-3 bg-card-foreground/5 relative">
                  <h4 className="text-md font-semibold">Filho(a) {index + 1}</h4>
                  <FormField
                    control={form.control}
                    name={`filhosComuns.${index}.nomeCompleto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo do Filho(a)</FormLabel>
                        <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                        <FormMessage>{errors?.filhosComuns?.[index]?.nomeCompleto?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`filhosComuns.${index}.dataNascimento`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento do Filho(a)</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage>{errors?.filhosComuns?.[index]?.dataNascimento?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="absolute top-2 right-2">
                    <Trash2 className="h-4 w-4 mr-1" /> Remover Filho
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ nomeCompleto: "", dataNascimento: "" })}
              >
                Adicionar Filho
              </Button>
            </section>
            
            <Separator className="my-8 bg-border" />
            <section className="space-y-6">
                <h3 className="text-lg font-semibold border-b border-border pb-2">Testemunhas (Opcional)</h3>
                <TestemunhaUniaoEstavelFormSection control={form.control} errors={errors} testemunhaIndex="testemunha1" />
                <Separator className="my-4 bg-border" />
                <TestemunhaUniaoEstavelFormSection control={form.control} errors={errors} testemunhaIndex="testemunha2" />
            </section>

            <Separator className="my-8 bg-border" />
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Documentos Adicionais (Uploads Opcionais)</h3>
              <FormField
                control={form.control}
                name="pactoRegimeBensUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pacto de Regime de Bens (Se houver e não for comunhão parcial)</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormMessage>{errors?.pactoRegimeBensUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comprovanteResidenciaComumUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprovante de Residência Comum</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormMessage>{errors?.comprovanteResidenciaComumUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {/* Adicionar campos para documentosConvivente1Urls e documentosConvivente2Urls se for fazer upload individual */}
            </section>

            <FormField
                control={form.control}
                name="dataRegistro"
                render={({ field }) => (
                    <FormItem className="hidden">
                    <FormLabel>Data do Registro (Automático)</FormLabel>
                    <FormControl><Input type="date" {...field} readOnly /></FormControl>
                    <FormMessage>{errors?.dataRegistro?.message}</FormMessage>
                    </FormItem>
                )}
            />

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
                    if (key === "filhosComuns" && Array.isArray(fieldErrors)) {
                        return fieldErrors.map((filhoError: any, index: number) => 
                            Object.entries(filhoError).map(([filhoKey, filhoMsg]: [string, any]) => 
                                filhoMsg?._errors?.map((msg: string, i: number) => 
                                    <li key={`filho-${index}-${filhoKey}-error-${i}`}>{`Filho ${index + 1} - ${filhoKey}: ${msg}`}</li>
                                )
                            )
                        );
                    } else if (typeof fieldErrors === "object" && fieldErrors && "_errors" in fieldErrors && Array.isArray(fieldErrors._errors)) {
                        return fieldErrors._errors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${key.replace("convivente1.", "Convivente 1: ").replace("convivente2.", "Convivente 2: ").replace("testemunha1.", "Testemunha 1: ").replace("testemunha2.", "Testemunha 2: ")}: ${errorMsg}`}</li>
                        ));
                    } else if (Array.isArray(fieldErrors)) { 
                        return fieldErrors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${key.replace("convivente1.", "Convivente 1: ").replace("convivente2.", "Convivente 2: ")}: ${errorMsg}`}</li>
                        ));
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrar União Estável
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

