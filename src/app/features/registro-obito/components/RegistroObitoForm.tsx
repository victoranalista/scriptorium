"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { RegistroObitoSchema, RegistroObitoFormData } from "../validation";
import { criarRegistroObitoAction } from "../actions";
import { RegistroObitoActionState } from "../types";
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

const initialState: RegistroObitoActionState = {
  message: "",
  status: "error",
  errors: null,
};

export function RegistroObitoForm() {
  const form = useForm<RegistroObitoFormData>({
    resolver: zodResolver(RegistroObitoSchema),
    defaultValues: {
      falecido: {
        nomeCompleto: "",
        sexo: undefined,
        nacionalidade: "Brasileira",
        naturalidade: "",
        profissao: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        estadoCivil: undefined,
        nomeConjuge: "",
        nomePai: "",
        nomeMae: "",
        enderecoCompleto: "",
      },
      dataObito: "",
      horaObito: "",
      localObito: "",
      municipioObito: "",
      ufObito: "",
      causaMorteAtestadoMedico: "",
      medicoResponsavelDeclaracaoNome: "",
      medicoResponsavelDeclaracaoCRM: "",
      localSepultamentoEnterro: "",
      seraCreimado: false,
      declarante: {
        nomeCompleto: "",
        cpf: "",
        rg: "",
        vinculoComFalecido: "",
        enderecoCompleto: "",
      },
      declaracaoObitoUrl: "",
      documentoFalecidoUrl: "",
      certidaoCasamentoNascimentoFalecidoUrl: "",
    },
  });

  const [state, formAction] = useFormState(criarRegistroObitoAction, initialState);
  const { errors } = state || {};

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 bg-background text-foreground border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registro de Óbito</CardTitle>
        <CardDescription>Preencha os dados abaixo para registrar o óbito.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* Dados do Falecido */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados do Falecido</h3>
              <FormField
                control={form.control}
                name="falecido.nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo do Falecido</FormLabel>
                    <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                    <FormMessage>{errors?.falecido?.nomeCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="falecido.sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors?.falecido?.sexo?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="falecido.nacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl><Input placeholder="Nacionalidade" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.nacionalidade?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="falecido.naturalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade (Cidade/UF)</FormLabel>
                      <FormControl><Input placeholder="Ex: Curitiba/PR" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.naturalidade?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="falecido.profissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl><Input placeholder="Profissão" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.profissao?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="falecido.cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.cpf?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="falecido.rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl><Input placeholder="Número do RG" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.rg?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="falecido.dataNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.dataNascimento?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="falecido.estadoCivil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                          <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                          <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                          <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                          <SelectItem value="União Estável">União Estável</SelectItem>
                          <SelectItem value="Não informado">Não Informado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors?.falecido?.estadoCivil?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="falecido.nomeConjuge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Cônjuge (se casado/união estável)</FormLabel>
                    <FormControl><Input placeholder="Nome completo do cônjuge" {...field} /></FormControl>
                    <FormMessage>{errors?.falecido?.nomeConjuge?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="falecido.nomePai"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Pai</FormLabel>
                      <FormControl><Input placeholder="Nome completo do pai" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.nomePai?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="falecido.nomeMae"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Mãe</FormLabel>
                      <FormControl><Input placeholder="Nome completo da mãe" {...field} /></FormControl>
                      <FormMessage>{errors?.falecido?.nomeMae?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="falecido.enderecoCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Último Endereço Completo do Falecido</FormLabel>
                    <FormControl><Input placeholder="Endereço completo" {...field} /></FormControl>
                    <FormMessage>{errors?.falecido?.enderecoCompleto?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            {/* Dados do Óbito */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados do Óbito</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dataObito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do Óbito</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage>{errors?.dataObito?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horaObito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora do Óbito (HH:MM, opcional)</FormLabel>
                      <FormControl><Input type="time" {...field} /></FormControl>
                      <FormMessage>{errors?.horaObito?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="localObito"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local do Óbito</FormLabel>
                    <FormControl><Input placeholder="Hospital, domicílio, via pública, etc." {...field} /></FormControl>
                    <FormMessage>{errors?.localObito?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="municipioObito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Município de Ocorrência do Óbito</FormLabel>
                      <FormControl><Input placeholder="Município" {...field} /></FormControl>
                      <FormMessage>{errors?.municipioObito?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ufObito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF de Ocorrência</FormLabel>
                      <FormControl><Input placeholder="UF" maxLength={2} {...field} /></FormControl>
                      <FormMessage>{errors?.ufObito?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="causaMorteAtestadoMedico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Causa da Morte (conforme atestado médico)</FormLabel>
                    <FormControl><Input placeholder="Causa da morte" {...field} /></FormControl>
                    <FormMessage>{errors?.causaMorteAtestadoMedico?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="medicoResponsavelDeclaracaoNome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Médico que Assinou a DO</FormLabel>
                      <FormControl><Input placeholder="Nome do médico" {...field} /></FormControl>
                      <FormMessage>{errors?.medicoResponsavelDeclaracaoNome?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medicoResponsavelDeclaracaoCRM"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CRM do Médico</FormLabel>
                      <FormControl><Input placeholder="CRM" {...field} /></FormControl>
                      <FormMessage>{errors?.medicoResponsavelDeclaracaoCRM?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="localSepultamentoEnterro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local de Sepultamento/Enterro</FormLabel>
                    <FormControl><Input placeholder="Cemitério, crematório, etc." {...field} /></FormControl>
                    <FormMessage>{errors?.localSepultamentoEnterro?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seraCreimado"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Será Creimado?
                      </FormLabel>
                      <FormDescription>
                        Marque se o corpo será cremado.
                      </FormDescription>
                    </div>
                    <FormMessage>{errors?.seraCreimado?.message}</FormMessage>
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
                  name="declarante.vinculoComFalecido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vínculo com o Falecido</FormLabel>
                      <FormControl><Input placeholder="Ex: Filho(a), Cônjuge, Irmão(ã)" {...field} /></FormControl>
                      <FormMessage>{errors?.declarante?.vinculoComFalecido?.message}</FormMessage>
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
                name="declaracaoObitoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Declaração de Óbito (DO) - Upload</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe o arquivo digitalizado da DO.</FormDescription>
                    <FormMessage>{errors?.declaracaoObitoUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentoFalecidoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento de Identificação do Falecido - Upload</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe RG, CPF ou outro documento do falecido.</FormDescription>
                    <FormMessage>{errors?.documentoFalecidoUrl?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certidaoCasamentoNascimentoFalecidoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certidão de Casamento/Nascimento do Falecido - Upload</FormLabel>
                    <FormControl><Input type="file" className="file:text-foreground" {...field} value={undefined} onChange={e => field.onChange(e.target.files?.[0])} /></FormControl>
                    <FormDescription>Anexe a certidão mais recente.</FormDescription>
                    <FormMessage>{errors?.certidaoCasamentoNascimentoFalecidoUrl?.message}</FormMessage>
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
                    // Verifica se fieldErrors é um objeto e tem a propriedade _errors
                    if (typeof fieldErrors === "object" && fieldErrors && "_errors" in fieldErrors && Array.isArray(fieldErrors._errors)) {
                        return fieldErrors._errors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${key.replace("falecido.", "Falecido: ").replace("declarante.", "Declarante: ")}: ${errorMsg}`}</li>
                        ));
                    } else if (Array.isArray(fieldErrors)) { // Caso seja um array de strings diretamente (erro no campo raiz)
                        return fieldErrors.map((errorMsg: string, index: number) => (
                            <li key={`${key}-error-${index}`}>{`${key.replace("falecido.", "Falecido: ").replace("declarante.", "Declarante: ")}: ${errorMsg}`}</li>
                        ));
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrar Óbito
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

