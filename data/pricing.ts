export interface Plan {
  price: string;
  priceAVista?: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
  whatsappLink: string;
}

const WA = "https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo";

export const plans: Plan[] = [
  { price: "69,90", priceAVista: "66,40",  buttonVariant: "secondary", whatsappLink: WA },
  { price: "49,90", priceAVista: "189,60", isPopular: true, buttonVariant: "primary",   whatsappLink: WA },
  { price: "44,90", priceAVista: "511,85", buttonVariant: "secondary", whatsappLink: WA },
];
