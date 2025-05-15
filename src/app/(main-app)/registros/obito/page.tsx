import { RegistroObitoForm } from "@/app/features/registro-obito/components/RegistroObitoForm";
import { Suspense } from "react";

export default function PaginaRegistroObito() {
  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <Suspense
        fallback={
          <div className="text-center text-lg">Carregando formulário...</div>
        }
      >
        <RegistroObitoForm />
      </Suspense>
    </div>
  );
}
