import { RegistroUniaoEstavelForm } from "@/app/features/registro-uniao-estavel/components/RegistroUniaoEstavelForm";
import { Suspense } from "react";

export default function PaginaRegistroUniaoEstavel() {
  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <Suspense
        fallback={
          <div className="text-center text-lg">Carregando formulário...</div>
        }
      >
        <RegistroUniaoEstavelForm />
      </Suspense>
    </div>
  );
}
