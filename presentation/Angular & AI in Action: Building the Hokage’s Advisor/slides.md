---
theme: seriph
background: https://cover.sli.dev
title: 'Missão: Salvar o Hokage!'
info: |
  ## Angular & AI in Action: Building the Hokage’s Advisor
  Dominando a Arte Ninja da IA com Angular, Genkit e Gemini
class: text-center
transition: slide-left
mdc: true
duration: 45min
---

# Missão: Salvar o Hokage!

## Dominando a Arte Ninja da IA com Angular, Genkit e Gemini

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/alvarocamillont/hokage-desk" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:logo-github />
  </a>
</div>

<div class="abs-bl m-6 text-xl">
  <p class="text-xs">Alvaro Camillo Neto</p>
  <p class="text-xs">Jounin Especialista em Angular e IA da Aldeia da Folha (Banco Santander)</p>
</div>

<!--
(Sobe ao palco com energia) E aí, pessoal! Meu nome é Alvaro Camillo Neto, e eu sou um Jounin Especialista em Angular e IA, reportando diretamente da Aldeia da Folha, na Terra do Fogo... também conhecida como Banco Santander. Hoje, nossa missão é uma das mais importantes já designadas: vamos usar nosso ninjutsu de código para salvar o Sétimo Hokage de seu maior inimigo... a papelada!
-->

---
layout: image-right
image: https://criticalhits.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/09/Naruto-Paperwork-1-Large-1536x865.jpg.webp
---

# O Pior Inimigo do Hokage

<br>

O herói da Quarta Grande Guerra Ninja...

O homem que selou a Kaguya...

...derrotado por relatórios.

<br>

<!--
Pensem nisso. O herói da Quarta Grande Guerra Ninja... o homem que selou a Kaguya... derrotado por relatórios. Gerar missões, classificar rankings, montar equipes... é um processo manual, lento e que drena o chakra de qualquer um. É o 'Jutsu Proibido da Papelada Infinita'! E a situação só piora na era Boruto!
-->

---
layout: center
class: text-center
---

# Apresentando o "Conselheiro Hokage"

<br>

<div class="text-4xl font-bold">
  Conselheiro Hokage
</div>

<br>

<p class="text-sm">Uma aplicação que usa Inteligência Artificial para ajudar nosso herói a:</p>
<p class="text-sm">Primeiro, gerar missões ninja automaticamente.</p>
<p class="text-sm">E segundo, classificar o ranking da missão e sugerir o time perfeito para ela.</p>
<p class="text-sm">Chega de sofrimento!</p>

<!--
É por isso que criamos o **Conselheiro Hokage**! Uma aplicação que usa Inteligência Artificial para ajudar nosso herói a: Primeiro, gerar missões ninja automaticamente. E segundo, classificar o ranking da missão e sugerir o time perfeito para ela. Chega de sofrimento!
-->

---
layout: intro
---

# A Arquitetura Ninja

<div class="grid grid-cols-3 gap-8">
  <div class="text-center">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" class="h-24 mx-auto">
    <p class="font-bold">Aldeia da Folha (Frontend)</p>
  </div>
  <div class="text-center">
    <img src="https://github.com/firebase/genkit/blob/main/docs/resources/genkit-logo-dark.png?raw=true" alt="Genkit" class="h-24 mx-auto">
    <p class="font-bold">Centro de Comando ANBU (Orquestração)</p>
  </div>
  <div class="text-center">
    <img src="https://www.gstatic.com/lamda/images/gemini_aurora_thumbnail_4g_e74822ff0ca4259beb718.png" alt="Gemini" class="h-24 mx-auto">
    <p class="font-bold">O Sábio dos Seis Caminhos (Inteligência)</p>
  </div>
</div>

<!--
Para construir nossa ferramenta, usamos um arsenal shinobi de ponta. Na nossa Aldeia (o frontend), temos o **Angular**. Para orquestrar nossas técnicas (o backend), o **Genkit**. E para o poder de criação, invocamos o modo sábio com o **Gemini**.
-->

---
layout: default
---

# Construindo a Aldeia com Angular e SSR

<br>

<div class="text-center">
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" class="h-48 mx-auto">
  <p class="text-2xl">SSR para uma resposta na velocidade do Relâmpago Amarelo</p>
</div>

<br>

<p class="text-sm">Por que Angular? Porque a Aldeia da Folha precisa de uma fundação robusta e escalável. E usamos SSR (Server-Side Rendering) pelo mesmo motivo que o Minato usava seu Hiraishin no Jutsu: para ter uma resposta inicial quase instantânea! A primeira missão já aparece na tela, sem demora.</p>

<!--
Por que Angular? Porque a Aldeia da Folha precisa de uma fundação robusta e escalável. E usamos SSR (Server-Side Rendering) pelo mesmo motivo que o Minato usava seu Hiraishin no Jutsu: para ter uma resposta inicial quase instantânea! A primeira missão já aparece na tela, sem demora.
-->

---
layout: two-cols
---

# Signals - O Byakugan do Frontend

<br>

<div class="text-center">
  <img src="https://criticalhits.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/byakugan.jpg.webp" alt="Byakugan" class="h-48 mx-auto">
</div>

::right::

<br>

```typescript
import { signal, computed } from '@angular/core';

const count = signal(0);
const double = computed(() => count() * 2);
```

<p class="text-sm">Para reatividade, usamos Signals. Pensem neles como o Byakugan do Clã Hyuga: eles enxergam *exatamente* os pontos de chakra da UI que mudaram e atualizam apenas aquilo. É precisão cirúrgica, sem renderizações desnecessárias. Eficiência máxima de chakra!</p>

<!--
Para reatividade, usamos Signals. Pensem neles como o Byakugan do Clã Hyuga: eles enxergam *exatamente* os pontos de chakra da UI que mudaram e atualizam apenas aquilo. É precisão cirúrgica, sem renderizações desnecessárias. Eficiência máxima de chakra!
-->

---
layout: center
class: text-center
---

# Gemini CLI - O Jutsu de Invocação Rápida

<br>

<div class="bg-black text-white p-4 rounded-lg">
  <pre class="text-left"><code class="language-bash">$ gemini init hokage-advisor</code></pre>
</div>

<br>

<p class="text-sm">Tudo começa com o **Gemini CLI**. É como um pergaminho de invocação: com um comando, você tem toda a estrutura do projeto de IA pronta. Ele cria o ambiente, as configurações... é o jeito mais rápido de começar sua missão, sem precisar ler mil pergaminhos de documentação.</p>

<!--
Tudo começa com o **Gemini CLI**. É como um pergaminho de invocação: com um comando, você tem toda a estrutura do projeto de IA pronta. Ele cria o ambiente, as configurações... é o jeito mais rápido de começar sua missão, sem precisar ler mil pergaminhos de documentação.
-->

---
layout: two-cols
---

# Genkit - Seu Time de Jounins

<br>

<div class="text-center">
  <img src="https://static0.cbrimages.com/wordpress/wp-content/uploads/2022/06/0FBA3C58-1E5B-4810-BBA9-C9764DC10C93.jpeg?q=70&fit=contain&w=750&h=422&dpr=1" alt="Kakashi" class="h-48 mx-auto">
</div>

::right::

<br>

<p class="text-sm">Se o Gemini é o poder bruto do Rasengan, o **Genkit é o Kakashi**: o líder tático que orquestra tudo. Ele define os `flows` (nossas estratégias de missão), adiciona logs para sabermos o que aconteceu (como um ninja sensor) e garante que a operação seja um sucesso. Ele é o cérebro da operação.</p>


<!--
Se o Gemini é o poder bruto do Rasengan, o **Genkit é o Kakashi**: o líder tático que orquestra tudo. Ele define os `flows` (nossas estratégias de missão), adiciona logs para sabermos o que aconteceu (como um ninja sensor) e garante que a operação seja um sucesso. Ele é o cérebro da operação.
-->

---
layout: image-right
image: https://preview.redd.it/what-other-jutsu-do-you-think-there-was-on-this-scroll-v0-720upniymytb1.jpg?auto=webp&s=8d9c608d8c2b6f230702520574aaa42dcd2eda86
---

# O Pergaminho Secreto - A Arte do Prompt

<br>

> "Aja como um conselheiro Hokage. Crie uma missão ninja criativa, descreva-a, classifique seu rank de D a S e sugira 3 ninjas da Aldeia da Folha qualificados para a missão."

<br>

<p class="text-sm">Este é o coração do nosso jutsu de IA: o prompt. É aqui que damos as instruções para o Gemini. A qualidade do seu pergaminho define a qualidade do jutsu!</p>

<!--
Este é o coração do nosso jutsu de IA: o prompt. É aqui que damos as instruções para o Gemini. 'Aja como um conselheiro Hokage. Crie uma missão ninja criativa, descreva-a, classifique seu rank de D a S e sugira 3 ninjas da Aldeia da Folha qualificados para a missão.' A qualidade do seu pergaminho define a qualidade do jutsu!
-->

---
layout: center
class: text-center
---

# Missão Completa! DEMO AO VIVO

<br>

<div class="text-4xl font-bold">
  DEMO AO VIVO
</div>

<br>

<!--
Chega de falar, vamos ver o Conselheiro Hokage em ação! Vamos pedir uma nova missão... *clica no botão*. E... pronto! Missão Rank-A: 'Infiltrar na Aldeia da Chuva para investigar boatos sobre um novo líder'. Sugestão de time: Sai, Yamato e Shino Aburame. O Hokage acabou de economizar 30 minutos. Sucesso!
-->

---
layout: image-right
image: /images/lamen.jpg
---

# O que Aprendemos na Missão de Hoje?

<br>

- **Angular com SSR e Signals** cria frontends com a velocidade do Relâmpago Amarelo.
- **Genkit** torna a orquestração de IA menos assustadora que enfrentar o Orochimaru.
- **IA não é sobre substituir o Hokage**, é sobre dar a ele as ferramentas para ser um líder melhor... e ter tempo para comer um bom lámen.

<!--
Então, o que aprendemos? Primeiro, **Angular com SSR e Signals** cria frontends com a velocidade do Relâmpago Amarelo. Segundo, **Genkit** torna a orquestração de IA menos assustadora que enfrentar o Orochimaru. E o mais importante: **IA não é sobre substituir o Hokage**, é sobre dar a ele as ferramentas para ser um líder melhor... e ter tempo para comer um bom lámen.
-->

---
layout: default
---

# Sua Próxima Missão

<br>

<div class="grid grid-cols-3 gap-8 text-center">
  <div>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/alvarocamillont/hokage-desk" alt="QR Code para o repositório do projeto no GitHub" class="mx-auto">
    <p>Repositório no GitHub</p>
  </div>
  <div>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ai.google.dev/genkit/docs" alt="QR Code para a documentação do Genkit" class="mx-auto">
    <p>Documentação do Genkit</p>
  </div>
  <div>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.linkedin.com/in/alvarocamillont/" alt="QR Code para o seu LinkedIn" class="mx-auto">
    <p>Meu LinkedIn</p>
  </div>
</div>

<br>

<p class="text-sm">Agora é com vocês! Peguem essas ferramentas e criem seus próprios jutsus. O código do Conselheiro Hokage está disponível para vocês estudarem. Comecem sua jornada para se tornarem os próximos Sábios da IA!</p>

<!--
Agora é com vocês! Peguem essas ferramentas e criem seus próprios jutsus. O código do Conselheiro Hokage está disponível para vocês estudarem. Comecem sua jornada para se tornarem os próximos Sábios da IA!
-->

---
layout: center
class: text-center
---

# Fim da Missão! Perguntas?

<br>

<img src="https://i.pinimg.com/736x/a3/c2/6c/a3c26c173f6a317431b2ddd586f8b10a.jpg" alt="Naruto Joinha" class="h-64 mx-auto">

<br>

<p>Alvaro Camillo Neto</p>
<p><a href="https://www.linkedin.com/in/alvarocamillont/">linkedin.com/in/alvarocamillont</a></p>
<p><a href="https://x.com/alvarocamillont">@alvarocamillont</a></p>

<!--
Missão cumprida! Muito obrigado, pessoal. Agora, estou aqui para responder qualquer pergunta que vocês tenham. Mandem ver! Dattebayo!
-->
