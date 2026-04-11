'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Locale = 'pt' | 'en' | 'es'

const STORAGE_KEY = 'integr8-lang'

interface Translations {
  nav: {
    cta: string
  }
  hero: {
    eyebrow: string
    headline1: string
    headline2: string
    sub1: string
    sub2: string
    sub3: string
    cta: string
  }
  identificacao: {
    b1h: string
    b1p1: string
    b1p2: string
    b1p3: string
    b2p1: string
    b2p2: string
    b2p3: string
    b2italic: string
    b3h: string
    b3p1: string
    b3p2: string
  }
  absolvicao: {
    headline: string
    items: string[]
    closing: string
  }
  diferencial: {
    headline: string
    sub: string
    blocks: Array<{
      contra: string
      favor: string
      body: string
    }>
  }
  denis: {
    headline: string
    p1: string
    p2: string
    p3: string
    p4: string
    p5: string
    p6: string
    quote: string
    credentials: string
  }
  imagensMentais: {
    headline: string
    sub: string
    cards: Array<{
      title: string
      body: string
    }>
  }
  oferta: {
    headline: string
    sub: string
    bullets: string[]
    priceIntro1: string
    priceIntro2: string
    priceIntro3: string
    ctaPlans: string
    ctaPrimary: string
    ctaSecondary: string
    tableCol1: string
    tableCol2: string
    tableCol3: string
    tableRow1: string
    tableRow2: string
    tableRow3: string
    tableLabel: string
    priceNote: string
    referral: string
  }
  faq: {
    questions: Array<{
      q: string
      a: string
    }>
    ptOnly: {
      q: string
      a: string
    }
    priceFaq: {
      q: string
      a: string
    }
  }
  ctaFinal: {
    headline: string
    sub: string
    p1: string
    p2: string
    ctaPrimary: string
    ctaSecondary: string
    guarantee: string
    guaranteeBody1: string
    guaranteeBody2: string
    guaranteeBody3: string
  }
  popup: {
    headline: string
    sub: string
    cta: string
    emailPlaceholder: string
    emailCta: string
    dismiss: string
  }
  footer: {
    copy: string
  }
}

const pt: Translations = {
  nav: { cta: 'Quero entender como →' },
  hero: {
    eyebrow: 'Protocolo C.O.R.E. 8 · Integr8',
    headline1: 'Você não falhou.',
    headline2: 'O programa é que não foi feito para a sua vida.',
    sub1: 'Você encontra energia para dar conta de tudo.',
    sub2: 'Menos de você mesmo.',
    sub3: 'Isso vai mudar.',
    cta: 'Quero entender como →',
  },
  identificacao: {
    b1h: 'Você gerencia coisas difíceis todo dia.',
    b1p1: 'Trabalho. Família. Decisões que não dão pra errar. Você resolve o que outras pessoas mal conseguem nomear.',
    b1p2: 'Mas existe uma área onde isso não está acontecendo.',
    b1p3: 'E quanto mais você sabe que deveria estar funcionando, mais pesa.',
    b2p1: 'Você já tentou cuidar do seu corpo antes.',
    b2p2: 'Talvez mais de uma vez. Começou bem, teve semanas boas. Depois a vida entrou no meio: uma viagem, um prazo, uma semana que virou caos. O treino parou. A alimentação foi junto. E o programa foi para a gaveta.',
    b2p3: 'A conclusão que ficou:',
    b2italic: 'talvez cuidar da saúde não seja para mim.',
    b3h: 'Essa conclusão está errada.',
    b3p1: 'O programa foi criado para uma rotina que você não tem. Com mais tempo livre do que você tem. Com imprevistos que não existem na sua vida.',
    b3p2: 'A mesma pessoa que tentou antes pode manter desta vez. O que muda é o programa.',
  },
  absolvicao: {
    headline: 'Você se reconhece em alguma dessas?',
    items: [
      'Acorda cansado mesmo tendo dormido o suficiente.',
      'No meio da tarde a energia cai, e você ainda tem horas pela frente.',
      'Olha para a agenda e não consegue ver onde um treino caberia sem tirar de algo que não dá para tirar.',
      'Tem uma voz interna que diz que você deveria estar se sentindo melhor, com mais disposição, mais dentro do seu corpo. Mas ela não é forte o suficiente para te fazer agir.',
      'Já tentou acompanhamento para a saúde antes e parou. E agora não sabe mais se vale tentar de novo.',
    ],
    closing: 'Se você chegou até aqui, saiba que pode ser diferente.',
  },
  diferencial: {
    headline: 'Agora vai ser diferente',
    sub: 'Não porque você mudou. Porque o programa vai ser feito para a vida que você tem.',
    blocks: [
      {
        contra: 'Em outros programas, você tem que parar a sua vida para conseguir executar o método.',
        favor: 'No C.O.R.E. 8, mapeamos primeiro como a sua vida realmente funciona.',
        body: 'A primeira coisa que fazemos é mapear como a sua vida realmente funciona: quais dias você tem, em que horários, com qual energia disponível. Só depois a programação é montada em cima do que é cabível para você.',
      },
      {
        contra: 'Outros programas não consideram que nem toda semana é igual.',
        favor: 'No C.O.R.E. 8, quando isso acontece você consegue remaneja o programa.',
        body: 'Quando a semana vira caos, você consegue remaneja o programa para encaixar na sua rotina daquela semana. Se esse padrão continuar, o coach realinha o protocolo com o que a sua vida exige naquele momento.',
      },
      {
        contra: 'Outros programas têm início, meio e fim.',
        favor: 'No C.O.R.E. 8, cada ciclo é parte de uma sequência.',
        body: 'Ao longo dos ciclos, você vai entendendo como o seu corpo responde: o que funciona, o que precisa mudar, por que algumas semanas correm bem e outras não. Essa compreensão vai se acumulando. Você sai com algo que nenhuma planilha consegue entregar.',
      },
    ],
  },
  denis: {
    headline: 'Quem está do outro lado',
    p1: 'Denis Gugia acompanha pessoas em treino e nutrição há mais de uma década.',
    p2: 'Trabalhou como personal trainer em academias no Brasil, coordenou equipes e entendeu cedo que o que separa quem mantém de quem abandona raramente tem a ver com falta de esforço.',
    p3: 'Em 2023, ele e a família se mudaram para outro país, com clima e cultura completamente diferentes.',
    p4: 'Nessa reconstrução, uma coisa ficou evidente: nos períodos em que ele planejava o dia com antecedência, as coisas funcionavam.',
    p5: 'Nos períodos sem esse planejamento, dependia de força de vontade em tempo real.',
    p6: 'Qualquer pessoa com vida cheia reconhece como isso termina.',
    quote: 'O C.O.R.E. 8 veio disso. De entender que quem consegue manter tem um plano que cabe na vida que tem, com suporte para navegar as semanas que fogem do controle. Não motivação. Estrutura.',
    credentials: 'Personal trainer certificado · Mais de uma década de experiência · Coordenador de academia · Empresário · Pai · Imigrante.',
  },
  imagensMentais: {
    headline: 'Não se trata apenas de ganhar ou perder quilos.',
    sub: 'Vamos falar sobre o que você ganha além disso.',
    cards: [
      {
        title: 'Sexta de manhã',
        body: 'Imagina acordar numa sexta-feira antes do despertador, com a sensação de que o corpo já descansou de verdade.\nVocê levanta, não por obrigação, mas porque ainda tem energia para enfrentar o último dia de uma semana intensa. E sabe que vai conseguir.',
      },
      {
        title: 'Reunião no final da tarde',
        body: '17h30. Uma reunião que não estava no calendário, quando todo mundo já está com a cabeça em ir embora.\nÉ exatamente o tipo de situação que te deixaria esgotado só de ouvir. Mas você está inteiro. Com clareza suficiente para conduzir, encerrar e ainda sair na hora.',
      },
      {
        title: 'Fim de semana com os filhos',
        body: 'Após uma semana intensa, seu filho pede para brincar.\nVocê vai. De verdade. Corre, se joga, está lá com a energia que você pensava que tinha perdido. É ele que pede pausa primeiro.',
      },
      {
        title: 'O jantar',
        body: 'Você olha para a sobremesa.\nPensa um segundo e aceita. Naquele dia você tinha feito as escolhas certas e havia espaço para isso. Sem negociação interna, sem culpa no dia seguinte.',
      },
      {
        title: 'A foto',
        body: 'Alguém tira uma foto.\nVocê vê. E não sente o impulso de pedir para deletar. Você está vendo a mudança acontecer, com um plano claro.',
      },
    ],
  },
  oferta: {
    headline: 'O que você tem no Protocolo C.O.R.E. 8',
    sub: 'Acompanhamento com uma pessoa real. Não um app. Não planilha em grupo de WhatsApp.',
    bullets: [
      'Onboarding completo: mapeamento da sua rotina, histórico e objetivos reais',
      'Treino e nutrição montados para você, com o que você tem, nos dias que você tem, com os alimentos que já fazem parte da sua vida',
      'Revisões quinzenais com análise dos dados e ajuste do protocolo',
      'Ajustes no app sem precisar esperar a próxima revisão quando a semana pede',
      'Suporte direto com o Denis ao longo de todo o acompanhamento',
      'App com histórico de treinos, registros e dashboard',
      'Com o tempo: você vai entendendo como o seu corpo funciona. Isso fica com você.',
    ],
    priceIntro1: 'Talvez você acredite que acompanhamento personalizado de alto nível tenha valores inacessíveis, ou que simplesmente não cabe no orçamento agora.',
    priceIntro2: 'Na maioria dos casos cabe. E provavelmente menos do que você imagina.',
    priceIntro3: 'Veja os planos abaixo. Os valores aparecem na sua moeda.',
    ctaPlans: 'VER PLANOS E INVESTIMENTO →',
    ctaPrimary: 'INICIAR PROTOCOLO →',
    ctaSecondary: 'Falar com o Denis →',
    tableCol1: 'Plano',
    tableCol2: 'Por mês',
    tableCol3: 'À vista',
    tableRow1: 'Mensal',
    tableRow2: 'Quadrimestral',
    tableRow3: 'Anual',
    tableLabel: 'Recomendado',
    priceNote: 'Preço base em CAD · Convertido para a sua moeda',
    referral: 'Se isso faz sentido para você e você conhece alguém que também estaria buscando algo assim, temos um programa de indicação que pode beneficiar tanto quem indica quanto quem é indicado.',
  },
  faq: {
    questions: [
      {
        q: 'E se minha semana virar caos?',
        a: 'Você ajusta diretamente no app, de acordo com o que a sua rotina permite naquele momento. Se esse padrão se tornar consistente, na revisão seguinte o coach realinha o protocolo com a realidade que você está vivendo. Você não começa do zero.',
      },
      {
        q: 'Já investi antes e não funcionou.',
        a: 'Na maioria das vezes o programa não foi desenhado para a vida real da pessoa. O C.O.R.E. 8 começa mapeando exatamente a rotina que você tem para só depois fazer a programação em cima do que é cabível. E ao longo das semanas, ela pode ser reajustada conforme a sua realidade muda.',
      },
      {
        q: 'Não tenho tempo para treinos longos.',
        a: 'Se você tem apenas 30 minutos três vezes por semana, o programa será montado em cima disso. Conforme as semanas avançam, vamos ajustando para que fique cada vez mais encaixado na sua rotina.',
      },
      {
        q: 'Academia ou posso treinar em casa?',
        a: 'Funciona com o que você tem: academia completa, pesos em casa ou equipamento mínimo. Isso é mapeado antes de qualquer prescrição.',
      },
      {
        q: 'Conhece alguém que também se beneficiaria?',
        a: 'Há um programa de indicação que pode beneficiar tanto quem indica quanto quem é indicado. Fale com o Denis para entender como funciona.',
      },
    ],
    ptOnly: {
      q: 'O protocolo é em português?',
      a: 'Sim. Para inglês ou espanhol, entre em contato antes de assinar.',
    },
    priceFaq: {
      q: 'Quanto custa começar?',
      a: "O investimento aparece em reais, dólares canadenses, ou na moeda do seu país quando você clica em 'Ver planos'. Na maioria dos casos é menos do que duas sessões de personal presencial por mês.",
    },
  },
  ctaFinal: {
    headline: 'Os próximos meses vão passar de qualquer forma.',
    sub: 'A questão é como você vai chegar no final deles.',
    p1: 'Igual a hoje: funcionando, mas não vivendo. Mais um ano com aquela inconsistência em silêncio.',
    p2: 'Ou acordando antes do despertador. Com energia para o último dia de uma semana intensa. Presente com quem você ama. Com clareza sobre o que funciona para o seu corpo.',
    ctaPrimary: 'QUERO CHEGAR AO FINAL DO ANO DIFERENTE →',
    ctaSecondary: 'Falar com o Denis antes de decidir →',
    guarantee: 'Os primeiros 21 dias são seus para decidir.',
    guaranteeBody1: 'Nos primeiros 21 dias você passa pelo onboarding: mapeamos sua rotina, objetivos e realidade. Você recebe a proposta personalizada e vê exatamente como o protocolo vai funcionar para você. Só depois o acompanhamento começa de verdade.',
    guaranteeBody2: 'Se não for o momento certo, devolvo 100%. Sem formulário, sem justificativa.',
    guaranteeBody3: 'A partir do dia 22: acompanhamento ativo. Ajustes baseados nos seus dados reais. O que funciona, continua. O que não funciona, muda.',
  },
  popup: {
    headline: 'Os próximos meses vão passar de qualquer forma.',
    sub: 'O Denis que você vai ser daqui a seis meses vai agradecer, ou se arrepender, pela decisão que você toma agora.',
    cta: 'Falar com o Denis →',
    emailPlaceholder: 'seu@email.com',
    emailCta: 'Receber mais informações',
    dismiss: 'Ainda não, obrigado.',
  },
  footer: {
    copy: '© 2026 Integr8 · Todos os direitos reservados',
  },
}

const en: Translations = {
  nav: { cta: 'How it works →' },
  hero: {
    eyebrow: 'C.O.R.E. 8 Protocol · Integr8',
    headline1: "You didn't fail.",
    headline2: "The program just wasn't built for your life.",
    sub1: 'You find energy to handle everything.',
    sub2: 'Except yourself.',
    sub3: 'That changes now.',
    cta: 'How it works →',
  },
  identificacao: {
    b1h: 'You manage hard things every day.',
    b1p1: 'Work. Family. Decisions that leave no room for error. You solve what others can barely name.',
    b1p2: 'But there is one area where this is not happening.',
    b1p3: 'And the more you know it should be working, the more it weighs on you.',
    b2p1: "You've tried to take care of your body before.",
    b2p2: "Maybe more than once. It started well, you had good weeks. Then life got in the way: a trip, a deadline, a week that fell apart. The workouts stopped. The eating followed. And the program went in a drawer.",
    b2p3: 'The conclusion that stuck:',
    b2italic: "maybe taking care of my health just isn't for me.",
    b3h: "That conclusion is wrong.",
    b3p1: "The program was built for a routine you don't have. With more free time than you have. With disruptions that don't exist in your life.",
    b3p2: 'The same person who tried before can maintain this time. What changes is the program.',
  },
  absolvicao: {
    headline: 'Do any of these sound familiar?',
    items: [
      'You wake up tired even after enough sleep.',
      "Your energy crashes in the afternoon, and you still have hours ahead.",
      "You look at your schedule and can't find a spot for a workout without cutting something you can't cut.",
      "There's an inner voice telling you that you should feel better, more alive, more at home in your body. But it's not loud enough to make you act.",
      "You've tried health coaching before and stopped. And now you're not sure it's worth trying again.",
    ],
    closing: "If you made it this far, know that it can be different.",
  },
  diferencial: {
    headline: 'This time will be different',
    sub: "Not because you changed. Because the program will be built for the life you actually have.",
    blocks: [
      {
        contra: 'Other programs make you pause your life to follow the method.',
        favor: 'With C.O.R.E. 8, we map how your life actually works first.',
        body: "The first thing we do is map how your life actually works: which days you have, what time slots, what energy is available. Only then is the programming built around what's realistic for you.",
      },
      {
        contra: 'Other programs don\'t account for the fact that not every week is the same.',
        favor: 'With C.O.R.E. 8, when that happens you can reshape the program.',
        body: "When the week goes sideways, you can reshape the program to fit your routine that week. If the pattern continues, the coach realigns the protocol to match what your life is demanding right now.",
      },
      {
        contra: 'Other programs have a beginning, middle, and end.',
        favor: 'With C.O.R.E. 8, each cycle is part of a sequence.',
        body: "Over the cycles, you start to understand how your body responds: what works, what needs to change, why some weeks run well and others don't. That understanding compounds. You leave with something no spreadsheet can deliver.",
      },
    ],
  },
  denis: {
    headline: "Who's on the other side",
    p1: "Denis Gugia has been coaching people in training and nutrition for over a decade.",
    p2: "He worked as a personal trainer in gyms in Brazil, managed teams, and understood early that what separates people who maintain from those who quit rarely has to do with lack of effort.",
    p3: "In 2023, he and his family moved to another country, with a completely different climate and culture.",
    p4: "During that rebuild, one thing became clear: during periods when he planned his day in advance, things worked.",
    p5: "During periods without that planning, he relied on willpower in real time.",
    p6: "Anyone with a full life knows how that ends.",
    quote: "C.O.R.E. 8 came from that. From understanding that those who maintain have a plan that fits the life they have, with support to navigate weeks that get out of control. Not motivation. Structure.",
    credentials: "Certified personal trainer · Over a decade of experience · Gym coordinator · Entrepreneur · Father · Immigrant.",
  },
  imagensMentais: {
    headline: "It's not just about gaining or losing weight.",
    sub: "Let's talk about what else you gain.",
    cards: [
      {
        title: 'Friday morning',
        body: "Imagine waking up on a Friday before your alarm, with the feeling that your body has truly rested.\nYou get up — not out of obligation, but because you still have energy to face the last day of an intense week. And you know you'll make it.",
      },
      {
        title: 'The late-afternoon meeting',
        body: "5:30pm. An unscheduled meeting, when everyone's mind is already on the way out.\nExactly the kind of situation that would drain you just to hear about. But you're fully there. Clear enough to lead, close it, and still leave on time.",
      },
      {
        title: 'Weekend with the kids',
        body: "After an intense week, your kid asks you to play.\nYou go. For real. You run, you jump in, you're there with the energy you thought you'd lost. They're the one who asks for a break first.",
      },
      {
        title: 'Dinner',
        body: "You look at the dessert.\nYou think for a second and say yes. That day you'd made the right choices and there was room for it. No internal negotiation, no guilt the next morning.",
      },
      {
        title: 'The photo',
        body: "Someone takes a photo.\nYou look at it. And you don't feel the urge to ask them to delete it. You're watching the change happen, with a clear plan.",
      },
    ],
  },
  oferta: {
    headline: "What you get in the C.O.R.E. 8 Protocol",
    sub: "Coaching with a real person. Not an app. Not a spreadsheet in a group chat.",
    bullets: [
      'Full onboarding: mapping your routine, history, and real goals',
      'Training and nutrition built for you, with what you have, on the days you have, with the foods already part of your life',
      'Bi-weekly reviews with data analysis and protocol adjustment',
      'In-app adjustments without waiting for the next review when the week demands it',
      "Direct support with Denis throughout the entire coaching period",
      'App with training history, logs, and dashboard',
      "Over time: you'll understand how your body works. That stays with you.",
    ],
    priceIntro1: "You might think high-level personalized coaching is out of reach, or simply doesn't fit your budget right now.",
    priceIntro2: "In most cases it does. And probably less than you think.",
    priceIntro3: "See the plans below. Prices appear in your currency.",
    ctaPlans: 'SEE PLANS & INVESTMENT →',
    ctaPrimary: 'START THE PROTOCOL →',
    ctaSecondary: 'Talk to Denis →',
    tableCol1: 'Plan',
    tableCol2: 'Per month',
    tableCol3: 'Upfront',
    tableRow1: 'Monthly',
    tableRow2: '4-Month',
    tableRow3: 'Annual',
    tableLabel: 'Recommended',
    priceNote: 'Base price in CAD · Converted to your currency',
    referral: "If this makes sense for you and you know someone else who would benefit, we have a referral program that can help both the person referring and the person being referred.",
  },
  faq: {
    questions: [
      {
        q: 'What if my week falls apart?',
        a: "You adjust directly in the app, based on what your routine allows at that moment. If that pattern becomes consistent, the next review realigns the protocol with the reality you're living. You don't start over.",
      },
      {
        q: "I've invested before and it didn't work.",
        a: "Most of the time the program wasn't designed for the person's real life. C.O.R.E. 8 starts by mapping exactly the routine you have before building the programming around what's realistic. And throughout the weeks, it can be readjusted as your reality changes.",
      },
      {
        q: "I don't have time for long workouts.",
        a: "If you only have 30 minutes three times a week, the program will be built around that. As the weeks progress, we keep adjusting so it fits your routine better and better.",
      },
      {
        q: 'Gym or can I train at home?',
        a: "Works with what you have: full gym, home weights, or minimal equipment. That's mapped before any prescription.",
      },
      {
        q: 'Know someone who would also benefit?',
        a: "There's a referral program that can benefit both the person referring and the person being referred. Talk to Denis to understand how it works.",
      },
    ],
    ptOnly: {
      q: 'Is the protocol in Portuguese?',
      a: 'Yes. For English or Spanish, get in touch before signing up.',
    },
    priceFaq: {
      q: 'How much does it cost to start?',
      a: "The investment appears in your local currency when you click 'See Plans'. In most cases it's less than two in-person personal training sessions per month.",
    },
  },
  ctaFinal: {
    headline: 'The next months will pass anyway.',
    sub: "The question is how you'll arrive at the end of them.",
    p1: 'Same as today: functioning, but not living. Another year with that quiet inconsistency.',
    p2: 'Or waking up before your alarm. With energy for the last day of an intense week. Present with the people you love. With clarity about what works for your body.',
    ctaPrimary: 'I WANT TO ARRIVE AT YEAR-END DIFFERENT →',
    ctaSecondary: 'Talk to Denis before deciding →',
    guarantee: 'The first 21 days are yours to decide.',
    guaranteeBody1: "During the first 21 days you go through onboarding: we map your routine, goals, and reality. You receive your personalized proposal and see exactly how the protocol will work for you. Only then does the actual coaching begin.",
    guaranteeBody2: "If it's not the right moment, I refund 100%. No form, no justification.",
    guaranteeBody3: "From day 22: active coaching. Adjustments based on your real data. What works, stays. What doesn't, changes.",
  },
  popup: {
    headline: 'The next months will pass anyway.',
    sub: "The Denis you'll be six months from now will be grateful — or regretful — for the decision you make right now.",
    cta: 'Talk to Denis →',
    emailPlaceholder: 'your@email.com',
    emailCta: 'Receive more information',
    dismiss: "Not now, thanks.",
  },
  footer: {
    copy: '© 2026 Integr8 · All rights reserved',
  },
}

const es: Translations = {
  nav: { cta: 'Cómo funciona →' },
  hero: {
    eyebrow: 'Protocolo C.O.R.E. 8 · Integr8',
    headline1: 'No fallaste.',
    headline2: 'El programa no fue hecho para tu vida.',
    sub1: 'Encuentras energía para todo.',
    sub2: 'Menos para ti.',
    sub3: 'Eso va a cambiar.',
    cta: 'Cómo funciona →',
  },
  identificacao: {
    b1h: 'Manejas cosas difíciles todos los días.',
    b1p1: 'Trabajo. Familia. Decisiones que no admiten errores. Resuelves lo que otros apenas pueden nombrar.',
    b1p2: 'Pero hay un área donde esto no está pasando.',
    b1p3: 'Y cuanto más sabes que debería funcionar, más pesa.',
    b2p1: 'Ya intentaste cuidar tu cuerpo antes.',
    b2p2: 'Tal vez más de una vez. Empezó bien, hubo buenas semanas. Luego la vida se interpuso: un viaje, un plazo, una semana caótica. El entrenamiento paró. La alimentación también. Y el programa fue al cajón.',
    b2p3: 'La conclusión que quedó:',
    b2italic: 'quizás cuidar mi salud simplemente no es para mí.',
    b3h: 'Esa conclusión está equivocada.',
    b3p1: 'El programa fue creado para una rutina que no tienes. Con más tiempo libre del que tienes. Con imprevistos que no existen en tu vida.',
    b3p2: 'La misma persona que lo intentó antes puede mantenerlo esta vez. Lo que cambia es el programa.',
  },
  absolvicao: {
    headline: '¿Te identificas con alguno de estos?',
    items: [
      'Te despiertas cansado aunque hayas dormido suficiente.',
      'A media tarde la energía cae, y todavía tienes horas por delante.',
      'Miras tu agenda y no puedes ver dónde cabría un entrenamiento sin quitar algo que no puedes quitar.',
      'Hay una voz interna que dice que deberías sentirte mejor, con más energía, más dentro de tu cuerpo. Pero no es lo suficientemente fuerte para hacerte actuar.',
      'Ya intentaste seguimiento de salud antes y lo dejaste. Y ahora no sabes si vale la pena intentarlo de nuevo.',
    ],
    closing: 'Si llegaste hasta aquí, sabe que puede ser diferente.',
  },
  diferencial: {
    headline: 'Esta vez será diferente',
    sub: 'No porque tú cambiaste. Porque el programa será hecho para la vida que tienes.',
    blocks: [
      {
        contra: 'En otros programas, tienes que detener tu vida para ejecutar el método.',
        favor: 'En C.O.R.E. 8, primero mapeamos cómo funciona realmente tu vida.',
        body: 'Lo primero que hacemos es mapear cómo funciona realmente tu vida: qué días tienes, en qué horarios, con qué energía disponible. Solo después se construye la programación sobre lo que es viable para ti.',
      },
      {
        contra: 'Otros programas no consideran que no todas las semanas son iguales.',
        favor: 'En C.O.R.E. 8, cuando eso pasa puedes reorganizar el programa.',
        body: 'Cuando la semana se vuelve caótica, puedes reorganizar el programa para encajar en tu rutina de esa semana. Si ese patrón continúa, el coach realinea el protocolo con lo que tu vida exige en ese momento.',
      },
      {
        contra: 'Otros programas tienen principio, medio y fin.',
        favor: 'En C.O.R.E. 8, cada ciclo es parte de una secuencia.',
        body: 'A lo largo de los ciclos, vas entendiendo cómo responde tu cuerpo: qué funciona, qué necesita cambiar, por qué algunas semanas van bien y otras no. Esa comprensión se va acumulando. Sales con algo que ninguna hoja de cálculo puede entregar.',
      },
    ],
  },
  denis: {
    headline: 'Quién está del otro lado',
    p1: 'Denis Gugia acompaña personas en entrenamiento y nutrición desde hace más de una década.',
    p2: 'Trabajó como entrenador personal en gimnasios en Brasil, coordinó equipos y entendió temprano que lo que separa a quienes mantienen de quienes abandonan rara vez tiene que ver con falta de esfuerzo.',
    p3: 'En 2023, él y su familia se mudaron a otro país, con un clima y una cultura completamente diferentes.',
    p4: 'En esa reconstrucción, algo quedó evidente: en los períodos en que planificaba el día con anticipación, las cosas funcionaban.',
    p5: 'En los períodos sin esa planificación, dependía de la fuerza de voluntad en tiempo real.',
    p6: 'Cualquier persona con la vida llena reconoce cómo termina eso.',
    quote: 'C.O.R.E. 8 nació de eso. De entender que quienes logran mantener tienen un plan que cabe en la vida que tienen, con apoyo para navegar las semanas que se salen de control. No motivación. Estructura.',
    credentials: 'Entrenador personal certificado · Más de una década de experiencia · Coordinador de gimnasio · Empresario · Padre · Inmigrante.',
  },
  imagensMentais: {
    headline: 'No se trata solo de ganar o perder kilos.',
    sub: 'Hablemos de lo que más ganas.',
    cards: [
      {
        title: 'Viernes por la mañana',
        body: 'Imagina despertar un viernes antes de la alarma, con la sensación de que el cuerpo ya descansó de verdad.\nTe levantas, no por obligación, sino porque todavía tienes energía para enfrentar el último día de una semana intensa. Y sabes que puedes.',
      },
      {
        title: 'La reunión de última hora',
        body: 'Las 17:30. Una reunión no programada, cuando todos ya tienen la cabeza en irse a casa.\nEs exactamente el tipo de situación que te agotaría solo de escucharla. Pero estás entero. Con suficiente claridad para liderar, cerrar y salir a tiempo.',
      },
      {
        title: 'Fin de semana con los hijos',
        body: 'Después de una semana intensa, tu hijo te pide jugar.\nVas. De verdad. Corres, te tiras al suelo, estás ahí con la energía que creías haber perdido. Es él quien pide pausa primero.',
      },
      {
        title: 'La cena',
        body: 'Miras el postre.\nPiensas un segundo y lo aceptas. Ese día habías tomado las decisiones correctas y había espacio para eso. Sin negociación interna, sin culpa al día siguiente.',
      },
      {
        title: 'La foto',
        body: 'Alguien toma una foto.\nLa ves. Y no sientes el impulso de pedir que la borren. Estás viendo el cambio suceder, con un plan claro.',
      },
    ],
  },
  oferta: {
    headline: 'Lo que tienes en el Protocolo C.O.R.E. 8',
    sub: 'Acompañamiento con una persona real. No una app. No una hoja de cálculo en un grupo de WhatsApp.',
    bullets: [
      'Onboarding completo: mapeo de tu rutina, historial y objetivos reales',
      'Entrenamiento y nutrición diseñados para ti, con lo que tienes, en los días que tienes, con los alimentos que ya forman parte de tu vida',
      'Revisiones quincenales con análisis de datos y ajuste del protocolo',
      'Ajustes en la app sin necesidad de esperar la próxima revisión cuando la semana lo pide',
      'Apoyo directo con Denis durante todo el acompañamiento',
      'App con historial de entrenamientos, registros y dashboard',
      'Con el tiempo: entenderás cómo funciona tu cuerpo. Eso se queda contigo.',
    ],
    priceIntro1: 'Quizás crees que el acompañamiento personalizado de alto nivel tiene valores inaccesibles, o simplemente no cabe en tu presupuesto ahora.',
    priceIntro2: 'En la mayoría de los casos sí cabe. Y probablemente menos de lo que imaginas.',
    priceIntro3: 'Ve los planes abajo. Los valores aparecen en tu moneda.',
    ctaPlans: 'VER PLANES E INVERSIÓN →',
    ctaPrimary: 'INICIAR PROTOCOLO →',
    ctaSecondary: 'Hablar con Denis →',
    tableCol1: 'Plan',
    tableCol2: 'Por mes',
    tableCol3: 'De contado',
    tableRow1: 'Mensual',
    tableRow2: 'Cuatrimestral',
    tableRow3: 'Anual',
    tableLabel: 'Recomendado',
    priceNote: 'Precio base en CAD · Convertido a tu moneda',
    referral: 'Si esto tiene sentido para ti y conoces a alguien que también estaría buscando algo así, tenemos un programa de referidos que puede beneficiar tanto a quien refiere como a quien es referido.',
  },
  faq: {
    questions: [
      {
        q: '¿Y si mi semana se vuelve caótica?',
        a: 'Ajustas directamente en la app, de acuerdo con lo que tu rutina permite en ese momento. Si ese patrón se vuelve constante, en la siguiente revisión el coach realinea el protocolo con la realidad que estás viviendo. No empiezas de cero.',
      },
      {
        q: 'Ya invertí antes y no funcionó.',
        a: 'La mayoría de las veces el programa no fue diseñado para la vida real de la persona. C.O.R.E. 8 comienza mapeando exactamente la rutina que tienes para después hacer la programación sobre lo que es viable. Y a lo largo de las semanas, puede reajustarse conforme tu realidad cambia.',
      },
      {
        q: 'No tengo tiempo para entrenamientos largos.',
        a: 'Si solo tienes 30 minutos tres veces por semana, el programa se construirá sobre eso. Conforme avanzan las semanas, vamos ajustando para que encaje cada vez mejor en tu rutina.',
      },
      {
        q: '¿Gimnasio o puedo entrenar en casa?',
        a: 'Funciona con lo que tienes: gimnasio completo, pesas en casa o equipamiento mínimo. Eso se mapea antes de cualquier prescripción.',
      },
      {
        q: '¿Conoces a alguien que también se beneficiaría?',
        a: 'Hay un programa de referidos que puede beneficiar tanto a quien refiere como a quien es referido. Habla con Denis para entender cómo funciona.',
      },
    ],
    ptOnly: {
      q: '¿El protocolo es en portugués?',
      a: 'Sí. Para inglés o español, contáctanos antes de inscribirte.',
    },
    priceFaq: {
      q: '¿Cuánto cuesta comenzar?',
      a: "La inversión aparece en tu moneda local cuando haces clic en 'Ver planes'. En la mayoría de los casos es menos que dos sesiones de personal trainer presencial al mes.",
    },
  },
  ctaFinal: {
    headline: 'Los próximos meses pasarán de todas formas.',
    sub: 'La pregunta es cómo llegarás al final de ellos.',
    p1: 'Igual que hoy: funcionando, pero sin vivir. Un año más con esa inconsistencia en silencio.',
    p2: 'O despertando antes de la alarma. Con energía para el último día de una semana intensa. Presente con quienes amas. Con claridad sobre lo que funciona para tu cuerpo.',
    ctaPrimary: 'QUIERO LLEGAR AL FINAL DEL AÑO DIFERENTE →',
    ctaSecondary: 'Hablar con Denis antes de decidir →',
    guarantee: 'Los primeros 21 días son tuyos para decidir.',
    guaranteeBody1: 'Durante los primeros 21 días pasas por el onboarding: mapeamos tu rutina, objetivos y realidad. Recibes la propuesta personalizada y ves exactamente cómo funcionará el protocolo para ti. Solo después comienza el acompañamiento de verdad.',
    guaranteeBody2: 'Si no es el momento adecuado, devuelvo el 100%. Sin formulario, sin justificación.',
    guaranteeBody3: 'A partir del día 22: acompañamiento activo. Ajustes basados en tus datos reales. Lo que funciona, continúa. Lo que no, cambia.',
  },
  popup: {
    headline: 'Los próximos meses pasarán de todas formas.',
    sub: 'El Denis que serás en seis meses agradecerá — o lamentará — la decisión que tomes ahora.',
    cta: 'Hablar con Denis →',
    emailPlaceholder: 'tu@email.com',
    emailCta: 'Recibir más información',
    dismiss: 'Ahora no, gracias.',
  },
  footer: {
    copy: '© 2026 Integr8 · Todos los derechos reservados',
  },
}

const translations: Record<Locale, Translations> = { pt, en, es }

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (l: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'pt'
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (saved && saved in translations) return saved
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('pt')) return 'pt'
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('es')) return 'es'
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')

  useEffect(() => {
    const detected = detectLocale()
    setLocaleState(detected)
    document.documentElement.lang =
      detected === 'pt' ? 'pt-BR' : detected === 'en' ? 'en' : 'es'
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
    document.documentElement.lang =
      l === 'pt' ? 'pt-BR' : l === 'en' ? 'en' : 'es'
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  const options: { value: Locale; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' },
  ]

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
      }}
    >
      {options.map((opt, i) => (
        <span key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {i > 0 && (
            <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>·</span>
          )}
          <button
            onClick={() => setLocale(opt.value)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              color:
                locale === opt.value
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-muted)',
              transition: 'color 150ms ease',
              padding: '4px 2px',
            }}
            onMouseEnter={e => {
              if (locale !== opt.value)
                (e.target as HTMLButtonElement).style.color = 'var(--color-accent-var)'
            }}
            onMouseLeave={e => {
              if (locale !== opt.value)
                (e.target as HTMLButtonElement).style.color = 'var(--color-text-muted)'
            }}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  )
}
