import { RegistroNatimortoForm } from "@/app/features/registro-natimorto/components/RegistroNatimortoForm";
import { Suspense } from "react";

export default function PaginaRegistroNatimorto() {
  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <Suspense
        fallback={
          <div className="text-center text-lg">Carregando formulário...</div>
        }
      >
        <RegistroNatimortoForm />
      </Suspense>
    </div>
  );
}
