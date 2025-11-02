# Global Frontmatter
# You can change the theme here. More themes at: https://sli.dev/themes/gallery.html
theme: 'seriph'
# The title of your presentation
title: 'Missão: Salvar o Hokage!'
# Enable syntax highlighting for code blocks
highlighter: 'shiki'
# Aspect ratio of the slides
aspectRatio: '16/9'
# Let's start on the first slide
canvasWidth: 980
# Download Google Fonts for better performance
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Fira Code'
---

<!-- 
SLIDE 1: ABERTURA
-->

---
layout: cover
---

# Missão: Salvar o Hokage!

## Dominando a Arte Ninja da IA com Angular, Genkit e Gemini

<div class="pt-12">
  <span class="px-2 py-1 rounded"> <b>Alvaro Camillo Neto</b> <br> Jounin Especialista em Angular e IA <br> Aldeia da Folha, Terra do Fogo (Banco Santander 😉) </span>
</div>

<!--
Roteiro do Palestrante:

(Sobe ao palco com energia) E aí, pessoal! Meu nome é Alvaro Camillo Neto, e eu sou um Jounin Especialista em Angular e IA, reportando diretamente da Aldeia da Folha, na Terra do Fogo... também conhecida como Banco Santander.

Hoje, nossa missão é uma das mais importantes já designadas: vamos usar nosso ninjutsu de código para salvar o Sétimo Hokage de seu maior inimigo... a papelada!
-->

---
<!-- 
SLIDE 2: O PIOR INIMIGO DO HOKAGE
-->
layout: default
background: https://i.pinimg.com/originals/c9/71/c6/c971c62b535d4642232231c1c18337a6.jpg
backgroundFilter: brightness(0.4)
---

# O Pior Inimigo do Hokage

<br>

> O herói da Quarta Grande Guerra Ninja... derrotado por uma montanha de documentos.

<!--
Roteiro do Palestrante:

Pensem nisso. O herói da Quarta Grande Guerra Ninja... o homem que selou a Kaguya... derrotado por relatórios. Gerar missões, classificar rankings, montar equipes... é um processo manual, lento e que drena o chakra de qualquer um. É o 'Jutsu Proibido da Papelada Infinita'! E a situação só piora na era Boruto!
-->

---
<!-- 
SLIDE 3: O PARALELO COM O MUNDO REAL
-->

# Nosso Inimigo no Mundo Real

<div class="grid grid-cols-2 gap-8 items-center">
<div>

Brincadeiras à parte, quem aqui nunca enfrentou isso?

- CRUDs infinitos
- Relatórios manuais
- Tarefas repetitivas

Essa é a *nossa* luta contra a burocracia, o que nos impede de inovar e criar nossos próprios "jutsus".

Mas e se a gente pudesse automatizar isso de uma forma... inteligente?

</div>
<div>
  <img src="https://previews.123rf.com/images/vectorsicon/vectorsicon1804/vectorsicon180400030/98918233-repetitive-work-vector-icon.jpg" class="rounded-lg shadow-lg" alt="Repetitive work icon">
</div>
</div>

<!--
Roteiro do Palestrante:

Brincadeiras à parte, quem aqui nunca enfrentou isso? CRUDs infinitos, relatórios manuais, tarefas repetitivas que nos impedem de inovar, de criar nossos próprios jutsus. Essa é a *nossa* luta contra a burocracia. Mas e se a gente pudesse automatizar isso de uma forma... inteligente?
-->

---
<!-- 
SLIDE 4: APRESENTANDO O CONSELHEIRO HOKAGE
-->
layout: section
---

# A Solução: O Conselheiro Hokage

Uma aplicação para ajudar nosso herói a:
1.  **Gerar missões ninja** automaticamente com IA.
2.  **Classificar o ranking** e sugerir o time perfeito para a missão.

<!--
Roteiro do Palestrante:

É por isso que criamos o **Conselheiro Hokage**! Uma aplicação que usa Inteligência Artificial para ajudar nosso herói a: Primeiro, gerar missões ninja automaticamente. E segundo, classificar o ranking da missão e sugerir o time perfeito para ela. Chega de sofrimento!
-->

---
<!-- 
SLIDE 5: A ARQUITETURA NINJA
-->
layout: default
background: 'https://i.pinimg.com/originals/7a/93/b5/7a93b55c659a68a6237c56960a588825.jpg'
backgroundFilter: brightness(0.6)
---

# A Arquitetura Shinobi

<br>

- **🪨 Aldeia da Folha (Frontend):** Angular
- **🕵️ Centro de Comando ANBU (Orquestração):** Genkit
- **🐸 O Sábio dos Seis Caminhos (Inteligência):** Gemini

<!--
Roteiro do Palestrante:

Para construir nossa ferramenta, usamos um arsenal shinobi de ponta. Na nossa Aldeia (o frontend), temos o **Angular**. Para orquestrar nossas técnicas (o backend), o **Genkit**. E para o poder de criação, invocamos o modo sábio com o **Gemini**.
-->

---
<!-- 
SLIDE 6: CONSTRUINDO COM ANGULAR E SSR
-->

# A Aldeia: Angular + SSR

<div class="grid grid-cols-2 gap-8 items-center">
<div>

Por que Angular? Porque a Aldeia da Folha precisa de uma fundação **robusta e escalável**.

Usamos **SSR (Server-Side Rendering)** pelo mesmo motivo que o Minato usava seu Hiraishin no Jutsu:

> Para uma resposta inicial na velocidade do **Relâmpago Amarelo**! ⚡

</div>
<div>
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" class="w-80 h-auto" alt="Angular Logo">
</div>
</div>

<!--
Roteiro do Palestrante:

Por que Angular? Porque a Aldeia da Folha precisa de uma fundação robusta e escalável. E usamos SSR (Server-Side Rendering) pelo mesmo motivo que o Minato usava seu Hiraishin no Jutsu: para ter uma resposta inicial quase instantânea! A primeira missão já aparece na tela, sem demora.
-->

---
<!-- 
SLIDE 7: SIGNALS - O BYAKUGAN DO FRONTEND
-->

# Reatividade: Signals, o Byakugan do Frontend

<div class="grid grid-cols-2 gap-8 items-center">
<div>
  <img src="https://i.pinimg.com/originals/e5/22/50/e5225026c278781f4500976f62f319b9.jpg" class="rounded-lg shadow-lg" alt="Byakugan">
</div>
<div>

Pense nos Signals como o **Byakugan**: eles enxergam *exatamente* os pontos de chakra da UI que mudaram e atualizam apenas aquilo.

É precisão cirúrgica, sem renderizações desnecessárias. **Eficiência máxima de chakra!**

```typescript
// O Byakugan em ação!
const missao = signal({ nome: 'Resgatar o Sasuke' });

const status = computed(() => {
  return `Status da missão ${missao().nome}: Em Andamento.`;
});
```

</div>
</div>

<!--
Roteiro do Palestrante:

Para reatividade, usamos Signals. Pensem neles como o Byakugan do Clã Hyuga: eles enxergam *exatamente* os pontos de chakra da UI que mudaram e atualizam apenas aquilo. É precisão cirúrgica, sem renderizações desnecessárias. Eficiência máxima de chakra!
-->

---
<!-- 
SLIDE 8: "STICH" UX - O JUTSU DE TRANSFORMAÇÃO
-->

# "Stitching" UX: O Jutsu de Transformação

A IA pode ser complexa, mas a experiência do usuário não precisa ser. Usamos "Stitching" (costura) na UX.

<div class="mt-8 p-4 border rounded-lg bg-gray-500 bg-opacity-10 text-center">
  <p class="font-mono text-sm">`{ "missao": "...", "rank": "A" }`</p>
  <span class="text-4xl">👇</span>
  <div class="p-4 border rounded-lg bg-white shadow text-black">
    <h3 class="font-bold">Missão Rank A</h3>
    <p>Infiltrar na Aldeia da Chuva...</p>
  </div>
</div>

É o Jutsu de Transformação que converte dados complexos em algo que até o Naruto entenderia.

<!--
Roteiro do Palestrante:

A IA pode ser complexa, mas a experiência do usuário não precisa ser. Usamos 'Stiching', ou costura, na UX. A IA gera o conteúdo bruto, e nós 'costuramos' isso numa interface limpa. É o 'Jutsu de Transformação' que converte dados complexos em algo que até o Naruto entenderia de primeira.
-->

---
<!-- 
SLIDE 9: GEMINI CLI - O JUTSU DE INVOCAÇÃO RÁPIDA
-->
layout: section
---

# O Poder da IA: Genkit e Gemini

---
<!-- 
SLIDE 10: GEMINI CLI
-->

# Gemini CLI: O Jutsu de Invocação Rápida

Tudo começa com o **Gemini CLI**. É como um pergaminho de invocação:

```bash
# Com um comando, a estrutura do projeto de IA está pronta!
$ gemini init hokage-advisor
```

Ele cria o ambiente e as configurações. É o jeito mais rápido de começar sua missão, sem precisar ler mil pergaminhos de documentação.

<!--
Roteiro do Palestrante:

Tudo começa com o **Gemini CLI**. É como um pergaminho de invocação: com um comando, você tem toda a estrutura do projeto de IA pronta. Ele cria o ambiente, as configurações... é o jeito mais rápido de começar sua missão, sem precisar ler mil pergaminhos de documentação.
-->

---
<!-- 
SLIDE 11: GENKIT - SEU TIME DE JOUNINS
-->

# Genkit: Seu Time de Jounins para Orquestração

<div class="grid grid-cols-2 gap-8 items-center">
<div>
  <img src="https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png" class="w-60 h-auto" alt="Kakashi Hatake">
</div>
<div>

Se o Gemini é o poder bruto do Rasengan, o **Genkit é o Kakashi**: o líder tático que orquestra tudo.

Ele define os `flows` (nossas estratégias), adiciona `logs` (como um ninja sensor) e garante que a operação seja um sucesso.

**É o cérebro da operação.**

</div>
</div>

<!--
Roteiro do Palestrante:

Se o Gemini é o poder bruto do Rasengan, o **Genkit é o Kakashi**: o líder tático que orquestra tudo. Ele define os `flows` (nossas estratégias de missão), adiciona logs para sabermos o que aconteceu (como um ninja sensor) e garante que a operação seja um sucesso. Ele é o cérebro da operação.
-->

---
<!-- 
SLIDE 12: O FLOW POR DENTRO
-->

# O `flow` do Genkit por Dentro

É TypeScript, super familiar!

```typescript
import { generate } from '@genkit-ai/ai';
import { defineFlow } from '@genkit-ai/flow';
import { geminiPro } from 'genkitx-googleai';
import { z } from 'zod';

export const missaoFlow = defineFlow(
  {
    name: 'missaoFlow',
    inputSchema: z.string(), // Tema da missão
    outputSchema: z.string(), // Descrição e rank
  },
  async (tema) => {
    // 1. Monta o pergaminho de instruções (prompt)
    const prompt = `Crie uma missão ninja com o tema: ${tema}. Classifique-a de D a S.`;

    // 2. Envia o pergaminho para o Gemini
    const llmResponse = await generate({
      model: geminiPro,
      prompt: prompt,
    });

    // 3. Retorna a resposta
    return llmResponse.text();
  }
);
```

<!--
Roteiro do Palestrante:

Olha como é um `flow` na prática. É TypeScript, super familiar! Definimos a entrada (`defineFlow`), montamos o nosso 'pergaminho de instruções' (o prompt), enviamos para o Gemini e formatamos a resposta com Zod para garantir que o pergaminho volte no formato certo. É declarativo, testável e muito poderoso.
-->

---
<!-- 
SLIDE 13: O PERGAMINHO SECRETO
-->

# O Pergaminho Secreto: A Arte do Prompt

<div class="grid grid-cols-2 gap-8 items-center">
<div>

Este é o coração do nosso jutsu de IA: **o prompt**.

> Aja como um conselheiro Hokage. Crie uma missão ninja criativa, descreva-a, classifique seu rank de D a S e sugira 3 ninjas da Aldeia da Folha qualificados para a missão, explicando o porquê.

A qualidade do seu pergaminho define a qualidade do seu jutsu!

</div>
<div>
  <img src="https://64.media.tumblr.com/d5a8c9918206d99727a36f990141d5a7/tumblr_ogc7s9sYk11vptewuo3_500.gif" class="rounded-lg shadow-lg" alt="Forbidden Scroll">
</div>
</div>
<!--
Roteiro do Palestrante:

Este é o coração do nosso jutsu de IA: o prompt. É aqui que damos as instruções para o Gemini. 'Aja como um conselheiro Hokage. Crie uma missão ninja criativa, descreva-a, classifique seu rank de D a S e sugira 3 ninjas da Aldeia da Folha qualificados para a missão, explicando o porquê.' A qualidade do seu pergaminho define a qualidade do seu jutsu!
-->

---
<!-- 
SLIDE 14: DEMO AO VIVO!
-->
layout: section
---

# Missão Completa!

## DEMO AO VIVO

<!--
Roteiro do Palestrante:

(AVISO: Hora de trocar para a tela da aplicação!)

Chega de falar, vamos ver o Conselheiro Hokage em ação! Vamos pedir uma nova missão... *clica no botão*. E... pronto! Missão Rank-A: 'Infiltrar na Aldeia da Chuva para investigar boatos sobre um novo líder'. Sugestão de time: Sai, Yamato e Shino Aburame. O Hokage acabou de economizar 30 minutos. Sucesso!
-->

---
<!-- 
SLIDE 15: O QUE APRENDEMOS
-->

# O que Aprendemos na Missão de Hoje?

<div class="grid grid-cols-2 gap-8 items-center">

<div>

- ⚡ **Angular com SSR e Signals** cria frontends com a velocidade do Relâmpago Amarelo.
-  Orchestration **Genkit** torna a orquestração de IA menos assustadora que enfrentar o Orochimaru.
- 🎨 **Uma boa UX** é o melhor genjutsu: esconde a complexidade e encanta o usuário.
- 🍜 **IA não é sobre substituir o Hokage**, é sobre dar a ele as ferramentas para ser um líder melhor (e ter tempo para comer um bom lámen).

</div>

<div>
  <img src="https://media1.tenor.com/m/TBCb1y5i_lYAAAAC/naruto-eating.gif" class="rounded-lg shadow-lg" alt="Naruto eating ramen">
</div>

</div>

<!--
Roteiro do Palestrante:

Então, o que aprendemos? Primeiro, Angular com SSR e Signals cria frontends com a velocidade do Relâmpago Amarelo. Segundo, Genkit torna a orquestração de IA menos assustadora que enfrentar o Orochimaru. E o mais importante: IA não é sobre substituir o Hokage, é sobre dar a ele as ferramentas para ser um líder melhor... e ter tempo para comer um bom lámen.
-->

---
<!-- 
SLIDE 16: SUA PRÓXIMA MISSÃO
-->

# Sua Próxima Missão

Pegue essas ferramentas e crie seus próprios jutsus!

<div class="grid grid-cols-3 gap-4 text-center mt-8">
  <div>
    <p class="font-bold">Código no GitHub</p>
    <!-- Replace with your actual QR Code image -->
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com" class="mx-auto" alt="QR Code to GitHub">
    <p class="text-sm">Link para o Repo</p>
  </div>
  <div>
    <p class="font-bold">Doc do Genkit</p>
    <!-- Replace with your actual QR Code image -->
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ai.google.dev/genkit/docs" class="mx-auto" alt="QR Code to Genkit Docs">
    <p class="text-sm">ai.google.dev/genkit</p>
  </div>
  <div>
    <p class="font-bold">Fale Comigo</p>
    <!-- Replace with your actual QR Code image -->
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://linkedin.com/in/alvarocamillont" class="mx-auto" alt="QR Code to your LinkedIn">
    <p class="text-sm">@SeuTwitter / LinkedIn</p>
  </div>
</div>

<!--
Roteiro do Palestrante:

Agora é com vocês! Peguem essas ferramentas e criem seus próprios jutsus. O código do Conselheiro Hokage está disponível para vocês estudarem. Comecem sua jornada para se tornarem os próximos Sábios da IA!
-->

---
<!-- 
SLIDE 17: FIM DA MISSÃO! PERGUNTAS?
-->
layout: cover
background: https://i.pinimg.com/originals/a1/30/41/a13041f481e349884e93737510257754.jpg
backgroundSize: cover
---

# Missão Cumprida!

## Perguntas?

<br>
<br>

**Alvaro Camillo Neto**
<br>
`@SeuTwitter` | `in/alvarocamillont`

<!--
Roteiro do Palestrante:

Missão cumprida! Muito obrigado, pessoal. Agora, estou aqui para responder qualquer pergunta que vocês tenham. Mandem ver! Dattebayo!
-->