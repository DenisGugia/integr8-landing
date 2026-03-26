export interface Plan {
  planName: string;
  description: string;
  price: string;
  priceAVista?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
  whatsappLink: string;
}

const WA = "https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo";

export const plans: Plan[] = [
  {
    planName: "Mensal",
    description: "Comece sem compromisso",
    price: "69,90",
    priceAVista: "66,40",
    features: [
      "Onboarding completo",
      "Treino e nutrição personalizados",
      "2 revisões quinzenais/mês",
      "Suporte via app",
      "Histórico e dashboard",
      "21 dias para decidir",
    ],
    buttonText: "Começar agora",
    buttonVariant: "secondary",
    whatsappLink: WA,
  },
  {
    planName: "Quadrimestral",
    description: "16 semanas · O protocolo completo",
    price: "49,90",
    priceAVista: "189,60",
    features: [
      "Onboarding completo",
      "Treino e nutrição personalizados",
      "8 revisões quinzenais",
      "Suporte direto com o coach",
      "Histórico e dashboard",
      "Comunidade de alunos",
      "Fórmula final: para sempre",
      "21 dias para decidir",
    ],
    buttonText: "Quero começar →",
    isPopular: true,
    buttonVariant: "primary",
    whatsappLink: WA,
  },
  {
    planName: "Anual",
    description: "Compromisso total · Melhor valor",
    price: "44,90",
    priceAVista: "511,85",
    features: [
      "Tudo do plano quadrimestral",
      "Prioridade nas revisões",
      "Acesso antecipado ao app",
      "21 dias para decidir",
    ],
    buttonText: "Começar agora",
    buttonVariant: "secondary",
    whatsappLink: WA,
  },
];
