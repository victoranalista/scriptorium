"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CadastroUsuarioPage() {
  // Placeholder para ação de cadastro no futuro
  const handleCadastro = async (formData: FormData) => {
    // Lógica de cadastro com Server Action viria aqui
    console.log("Tentativa de cadastro com:", {
      nome: formData.get("nome"),
      email: formData.get("email"),
      perfil: formData.get("perfil"),
      // Não logar senha em produção
    });
    // Redirecionar ou mostrar mensagem de sucesso/erro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-lg border-border shadow-2xl">
        <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserPlus className="h-8 w-8 mr-3 text-primary" />
                    <CardTitle className="text-2xl font-bold">Cadastro de Novo Usuário</CardTitle>
                </div>
                <Link href="/login" passHref>
                    <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Login
                    </Button>
                </Link>
            </div>
          <CardDescription>
            Preencha os dados abaixo para criar uma nova conta de funcionário.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={handleCadastro} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input 
                id="nome" 
                name="nome" 
                type="text" 
                placeholder="Nome completo do funcionário" 
                required 
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Institucional</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="funcionario@cartorio.com" 
                required 
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="perfil">Perfil de Acesso</Label>
              <Select name="perfil" required>
                <SelectTrigger className="bg-input text-foreground border-input focus:border-primary">
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="escrevente">Escrevente</SelectItem>
                  <SelectItem value="oficial">Oficial</SelectItem>
                  <SelectItem value="admin">Administrador do Sistema</SelectItem> 
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha Provisória</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="Crie uma senha forte"
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha Provisória</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                required 
                placeholder="Confirme a senha"
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2 pt-2">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <UserPlus className="mr-2 h-5 w-5" /> Cadastrar Usuário
                </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Após o cadastro, o usuário deverá alterar a senha no primeiro acesso.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

