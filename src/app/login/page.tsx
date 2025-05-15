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
import { LockKeyhole, LogIn } from "lucide-react";

export default function LoginPage() {
  // Placeholder para ação de login no futuro
  const handleLogin = async (formData: FormData) => {

    // Lógica de autenticação com NextAuth/Server Action viria aqui
    console.log("Tentativa de login com:", {
      email: formData.get("email"),
      // Não logar senha em produção
    });
    // Redirecionar para o dashboard ou mostrar erro
    // Por enquanto, apenas loga no console
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-md border-border shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <LockKeyhole className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Acesso ao Sistema</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o painel do cartório.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="seuemail@cartorio.com" 
                required 
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#" // Placeholder para página de recuperação de senha
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="********"
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2 pt-2">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <LogIn className="mr-2 h-5 w-5" /> Entrar
                </Button>
            </div>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            (Placeholder para Autenticação Multi-Fator - MFA)
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-xs text-muted-foreground">
                Apenas para desenvolvimento:
            </p>
            <Link href="/dashboard" passHref>
                <Button variant="outline" className="w-full border-border hover:bg-muted">
                    Acessar Dashboard (Bypass)
                </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

