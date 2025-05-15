import { RegistroNascimentoForm } from "@/app/features/registro-nascimento/components/RegistroNascimentoForm";
import { Suspense } from "react";

export default function PaginaRegistroNascimento() {
  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <Suspense
        fallback={
          <div className="text-center text-lg">Carregando formulário...</div>
        }
      >
        <RegistroNascimentoForm />
      </Suspense>
    </div>
  );
}
