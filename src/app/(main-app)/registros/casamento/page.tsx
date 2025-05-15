import { RegistroCasamentoForm } from "@/app/features/registro-casamento/components/RegistroCasamentoForm";
import { Suspense } from "react";

export default function PaginaRegistroCasamento() {
  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <Suspense
        fallback={
          <div className="text-center text-lg">Carregando formulário...</div>
        }
      >
        <RegistroCasamentoForm />
      </Suspense>
    </div>
  );
}
