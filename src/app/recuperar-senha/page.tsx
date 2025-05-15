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
import { MailQuestion, ArrowLeft } from "lucide-react";

export default function RecuperarSenhaPage() {
  // Placeholder para ação de recuperação de senha no futuro
  const handleRecuperarSenha = async (formData: FormData) => {
    // Lógica de recuperação de senha com Server Action viria aqui
    console.log("Tentativa de recuperação de senha para o email:", {
      email: formData.get("email"),
    });
    // Enviar email de recuperação ou mostrar mensagem de sucesso/erro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-md border-border shadow-2xl">
        <CardHeader className="space-y-1">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <MailQuestion className="h-8 w-8 mr-3 text-primary" />
                    <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
                </div>
                <Link href="/login" passHref>
                    <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Login
                    </Button>
                </Link>
            </div>
          <CardDescription>
            Digite seu email cadastrado para enviarmos as instruções de recuperação de senha.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={handleRecuperarSenha} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Cadastrado</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="seuemail@cartorio.com" 
                required 
                className="bg-input text-foreground border-input focus:border-primary"
              />
            </div>
            <div className="space-y-2 pt-2">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Enviar Instruções
                </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Se o email estiver cadastrado, você receberá um link para redefinir sua senha.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

