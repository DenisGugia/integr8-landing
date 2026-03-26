import {
  Dumbbell, Apple, Scale, Activity,
  Footprints, Droplets, Moon, Camera
} from "lucide-react";
import type { ElementType } from "react";

export interface Pillar {
  id: number;
  title: string;
  shortTitle: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export const pillars: Pillar[] = [
  {
    id: 1,
    title: "Sobrecarga Progressiva",
    shortTitle: "Treino",
    date: "Pilar 1",
    content: "O treinamento é regido por números, não por esforço percebido vago. Carga registrada, cadência mantida, amplitude total. Falha mecânica em RPE 8–10.",
    category: "Treino",
    icon: Dumbbell,
    relatedIds: [7, 8],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Nutrição Matemática",
    shortTitle: "Macros",
    date: "Pilar 2",
    content: "A dieta é uma equação de precisão. Divisão exata de Proteínas, Carboidratos e Gorduras. Tolerância máxima de 100 kcal. 80% de fontes limpas.",
    category: "Nutrição",
    icon: Apple,
    relatedIds: [3, 5],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Pesagem de Alimentos",
    shortTitle: "Pesagem",
    date: "Pilar 3",
    content: "Balança de cozinha obrigatória. 100% dos alimentos em gramas. Lançamento imediato em app. Comparação diária entre planejado e executado.",
    category: "Nutrição",
    icon: Scale,
    relatedIds: [2, 4],
    status: "completed",
    energy: 85,
  },
  {
    id: 4,
    title: "Biometria Corporal",
    shortTitle: "Biometria",
    date: "Pilar 4",
    content: "Pesagem diária em jejum. Fita métrica semanal: pescoço, cintura e quadril. Cálculo de %G para rastrear gordura visceral e subcutânea.",
    category: "Dados",
    icon: Activity,
    relatedIds: [3, 8],
    status: "in-progress",
    energy: 80,
  },
  {
    id: 5,
    title: "Passos Diários (NEAT)",
    shortTitle: "Passos",
    date: "Pilar 5",
    content: "Mínimo de 8.000–10.000 passos monitorados via smartphone ou relógio. Aumenta o déficit calórico sem gerar fadiga central.",
    category: "Movimento",
    icon: Footprints,
    relatedIds: [2, 6],
    status: "in-progress",
    energy: 75,
  },
  {
    id: 6,
    title: "Hidratação Individualizada",
    shortTitle: "Hidratação",
    date: "Pilar 6",
    content: "35ml × kg de peso corporal por dia. Garrafa graduada para controle. Balanço hídrico estável evita oscilações falsas na pesagem.",
    category: "Saúde",
    icon: Droplets,
    relatedIds: [4, 5],
    status: "pending",
    energy: 70,
  },
  {
    id: 7,
    title: "Recuperação e Sono",
    shortTitle: "Sono/HRV",
    date: "Pilar 7",
    content: "Mínimo de 7 horas de sono para recuperação do SNC. Monitoramento de HRV para ajuste de volume de treino. Deload baseado em dados de queda de performance.",
    category: "Recuperação",
    icon: Moon,
    relatedIds: [1, 8],
    status: "pending",
    energy: 88,
  },
  {
    id: 8,
    title: "Auditoria Semanal",
    shortTitle: "Auditoria",
    date: "Pilar 8",
    content: "Fotos semanais em 3 ângulos com iluminação idêntica. Questionário de feedback: adesão, estresse e digestão. Reajuste matemático de dieta e treino baseado nos dados.",
    category: "Controle",
    icon: Camera,
    relatedIds: [1, 4],
    status: "pending",
    energy: 92,
  },
];
