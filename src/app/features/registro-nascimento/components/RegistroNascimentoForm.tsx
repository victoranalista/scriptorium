"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { RegistroNascimentoSchema, RegistroNascimentoFormData } from "../validation";
import { criarRegistroNascimentoAction, ActionState } from "../actions";
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
import { Separator } from "@/components/ui/separator"; // Importar Separator

const initialState: ActionState = {
  message: "",
  status: "error", // Default to error to avoid premature success messages
  errors: null,
};

export function RegistroNascimentoForm() {
  const form = useForm<RegistroNascimentoFormData>({
    resolver: zodResolver(RegistroNascimentoSchema),
    defaultValues: {
      criancaNomeCompleto: "",
      criancaSexo: undefined,
      criancaDataNascimento: "",
      criancaHoraNascimento: "",
      criancaLocalNascimento: "",
      criancaMunicipioNascimento: "",
      criancaUFNascimento: "",
      criancaNacionalidade: "Brasileira",
      maeNomeCompleto: "",
      maeNaturalidade: "",
      maeNacionalidade: "Brasileira",
      maeProfissao: "",
      maeIdadeEpocaNascimento: undefined,
      maeCPF: "",
      maeRG: "",
      maeEnderecoCompleto: "",
      maeEstadoCivil: undefined,
      paiNomeCompleto: "",
      paiNaturalidade: "",
      paiNacionalidade: "Brasileira",
      paiProfissao: "",
      paiIdadeEpocaNascimento: undefined,
      paiCPF: "",
      paiRG: "",
      paiEnderecoCompleto: "",
      paiEstadoCivil: undefined,
      declaranteNomeCompleto: "",
      declaranteDocumentoIdentificacao: "",
      declaranteParentescoVinculo: "",
      dnvNumero: "",
    },
  });

  const [state, formAction] = useFormState(criarRegistroNascimentoAction, initialState);

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 bg-background text-foreground border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registro de Nascimento</CardTitle>
        <CardDescription>Preencha os dados abaixo para registrar o nascimento.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* Dados da Criança */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados da Criança</h3>
              <FormField
                control={form.control}
                name="criancaNomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo da Criança</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo da criança" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="criancaSexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o sexo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Ignorado">Ignorado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="criancaDataNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="criancaHoraNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de Nascimento (opcional)</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="criancaLocalNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local de Nascimento</FormLabel>
                      <FormControl>
                        <Input placeholder="Hospital, domicílio, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="criancaMunicipioNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Município de Nascimento</FormLabel>
                      <FormControl>
                        <Input placeholder="Município" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="criancaUFNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UF</FormLabel>
                      <FormControl>
                        <Input placeholder="UF" maxLength={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="criancaNacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Nacionalidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Separator className="my-6 bg-border" />

            {/* Dados da Mãe */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados da Mãe</h3>
              <FormField
                control={form.control}
                name="maeNomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo da Mãe</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo da mãe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="maeNaturalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade (Cidade/UF)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: São Paulo/SP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maeNacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Nacionalidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maeProfissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl>
                        <Input placeholder="Profissão" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="maeIdadeEpocaNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade na Época do Nascimento</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Idade" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maeCPF"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maeRG"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="Número do RG" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="maeEnderecoCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maeEstadoCivil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado Civil</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado civil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Solteira">Solteira</SelectItem>
                        <SelectItem value="Casada">Casada</SelectItem>
                        <SelectItem value="Divorciada">Divorciada</SelectItem>
                        <SelectItem value="Viúva">Viúva</SelectItem>
                        <SelectItem value="União Estável">União Estável</SelectItem>
                        <SelectItem value="Não informado">Não Informado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                name="paiNomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo do Pai</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo do pai (se houver)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="paiNaturalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naturalidade (Cidade/UF)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Rio de Janeiro/RJ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paiNacionalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Nacionalidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paiProfissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl>
                        <Input placeholder="Profissão" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="paiIdadeEpocaNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade na Época do Nascimento</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Idade" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paiCPF"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paiRG"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="Número do RG" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="paiEnderecoCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paiEstadoCivil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado Civil</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado civil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Solteiro">Solteiro</SelectItem>
                        <SelectItem value="Casado">Casado</SelectItem>
                        <SelectItem value="Divorciado">Divorciado</SelectItem>
                        <SelectItem value="Viúvo">Viúvo</SelectItem>
                        <SelectItem value="União Estável">União Estável</SelectItem>
                        <SelectItem value="Não informado">Não Informado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <Separator className="my-6 bg-border" />

            {/* Dados do Declarante (se não for pai ou mãe) */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Dados do Declarante (se não for pai ou mãe)</h3>
              <FormField
                control={form.control}
                name="declaranteNomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo do Declarante</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do declarante" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="declaranteDocumentoIdentificacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento de Identificação</FormLabel>
                      <FormControl>
                        <Input placeholder="RG, CPF, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="declaranteParentescoVinculo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parentesco ou Vínculo com a Criança</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Avô(ó), Tio(a), Responsável Legal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <Separator className="my-6 bg-border" />

            {/* Documentos Anexos */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Documentos Anexos</h3>
              <FormField
                control={form.control}
                name="dnvNumero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da Declaração de Nascido Vivo (DNV)</FormLabel>
                    <FormControl>
                      <Input placeholder="Número da DNV" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Upload da DNV (Declaração de Nascido Vivo)</FormLabel>
                <FormControl>
                  <Input type="file" className="file:text-foreground" />
                </FormControl>
                <FormDescription>Anexe o arquivo digitalizado da DNV.</FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Upload dos Documentos dos Pais</FormLabel>
                <FormControl>
                  <Input type="file" className="file:text-foreground" />
                </FormControl>
                <FormDescription>Anexe os documentos de identificação dos pais.</FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Upload do Comprovante de Residência</FormLabel>
                <FormControl>
                  <Input type="file" className="file:text-foreground" />
                </FormControl>
                <FormDescription>Anexe um comprovante de residência recente.</FormDescription>
                <FormMessage />
              </FormItem>
            </section>

            {state?.message && (
              <p className={`${state.status === "success" ? "text-green-500" : "text-red-500"} text-sm`}>
                {state.message}
              </p>
            )}
            {/* Exibir erros de validação globais ou específicos não cobertos pelos FormField */}
            {state?.errors && (
              <div className="text-red-500 text-sm">
                <p>Por favor, corrija os seguintes erros:</p>
                <ul>
                  {Object.entries(state.errors).map(([key, messages]) => (
                    messages && <li key={key}>{`${key}: ${messages.join(", ")}`}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrar Nascimento
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

