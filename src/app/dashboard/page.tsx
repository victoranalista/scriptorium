import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, CalendarDays, Search, UserCog, Baby, Heart, BookUser, ShieldAlert } from "lucide-react"; 

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function DashboardCard({ title, description, href, icon }: DashboardCardProps) {
  return (
    <Link href={href} passHref>
      <Card className="hover:shadow-lg transition-shadow duration-300 ease-in-out bg-card text-card-foreground border-border h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const cardModules = [
    {
      title: "Registro de Nascimento",
      description: "Registrar um novo nascimento.",
      href: "/registros/nascimento",
      icon: <Baby className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Registro de Casamento",
      description: "Registrar um novo casamento.",
      href: "/registros/casamento",
      icon: <Heart className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Registro de Óbito",
      description: "Registrar um novo óbito.",
      href: "/registros/obito",
      icon: <BookUser className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Registro de União Estável",
      description: "Registrar uma nova união estável.",
      href: "/registros/uniao-estavel",
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Registro de Natimorto",
      description: "Registrar um novo natimorto.",
      href: "/registros/natimorto",
      icon: <ShieldAlert className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Agendamentos",
      description: "Gerenciar agendamentos de cerimônias e atendimentos.",
      href: "/agendamentos", 
      icon: <CalendarDays className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Consultar Registros",
      description: "Buscar e visualizar registros existentes.",
      href: "/consultar-registros", 
      icon: <Search className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Administração de Usuários",
      description: "Gerenciar usuários e permissões do sistema.",
      href: "/admin/usuarios", 
      icon: <UserCog className="h-6 w-6 text-muted-foreground" />,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Scriptorium</h1>
        <p className="text-xl text-muted-foreground mt-2">Selecione o tipo de registro que deseja iniciar</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardModules.map((module) => (
          <DashboardCard
            key={module.title}
            title={module.title}
            description={module.description}
            href={module.href}
            icon={module.icon}
          />
        ))}
      </div>

      {/* Podemos adicionar aqui mudanças de layout tmb caso queiram */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Resumo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Registros Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Você tem X registros pendentes para envio a CRC/SIRC.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Seu próximo agendamento é para DD/MM/AAAA.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

