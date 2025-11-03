---
theme: seriph
background: /images/cover.webp
title: 'Mission: Save the Hokage!'
info: |
  ## Angular & AI in Action: Building the Hokage’s Advisor
  Mastering the Ninja Art of AI with Angular, Genkit, and Gemini
class: text-center
transition: slide-left
mdc: true
duration: 45min
---

# Mission: Save the Hokage!

## Mastering the Ninja Art of AI with Angular, Genkit, and Gemini

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
  <p class="text-xs">Angular and AI Specialist Jounin from the Hidden Leaf Village (Banco Santander)</p>
</div>

<!--
(Comes onto the stage with energy) Hey everyone! My name is Alvaro Camillo Neto, and I'm an Angular and AI Specialist Jounin, reporting directly from the Hidden Leaf Village, in the Land of Fire... also known as Banco Santander. Today, our mission is one of the most important ever assigned: we're going to use our code ninjutsu to save the Seventh Hokage from his greatest enemy... paperwork!
-->

---
layout: image-right
image: /images/naruto-paperwork.jpg.webp
---

# The Hokage's Worst Enemy

<br>

The hero of the Fourth Great Ninja War...

The man who sealed Kaguya...

...defeated by reports.

<br>

<!--
Think about it. The hero of the Fourth Great Ninja War... the man who sealed Kaguya... defeated by reports. Generating missions, classifying ranks, assembling teams... it's a manual, slow process that drains anyone's chakra. It's the 'Forbidden Jutsu of Infinite Paperwork'! And the situation only gets worse in the Boruto era!
-->

---
layout: center
class: text-center
---

# Introducing the "Hokage Advisor"

<br>

<div class="text-4xl font-bold">
  Hokage Advisor
</div>

<br>

<p class="text-sm">An application that uses Artificial Intelligence to help our hero to:</p>
<p class="text-sm">First, automatically generate ninja missions.</p>
<p class="text-sm">And second, classify the mission's rank and suggest the perfect team for it.</p>
<p class="text-sm">No more suffering!</p>

<!--
That's why we created the **Hokage Advisor**! An application that uses Artificial Intelligence to help our hero to: First, automatically generate ninja missions. And second, classify the mission's rank and suggest the perfect team for it. No more suffering!
-->

---
layout: intro
---

# The Ninja Architecture

<div class="grid grid-cols-3 gap-8">
  <div class="text-center">
    <img src="/images/angular-logo.svg" alt="Angular" class="h-24 mx-auto">
    <p class="font-bold">Hidden Leaf Village (Frontend)</p>
  </div>
  <div class="text-center">
    <img src="/images/genkit-logo-dark.png" alt="Genkit" class="h-24 mx-auto">
    <p class="font-bold">ANBU Command Center (Orchestration)</p>
  </div>
  <div class="text-center">
    <img src="/images/gemini-aurora.png" alt="Gemini" class="h-24 mx-auto">
    <p class="font-bold">The Sage of Six Paths (Intelligence)</p>
  </div>
</div>

<!--
To build our tool, we used a cutting-edge shinobi arsenal. In our Village (the frontend), we have **Angular**. To orchestrate our techniques (the backend), **Genkit**. And for the power of creation, we invoked sage mode with **Gemini**.
-->

---
layout: default
---

# Building the Village with Angular and SSR

<br>

<div class="text-center">
  <img src="/images/angular-logo.svg" alt="Angular" class="h-48 mx-auto">
  <p class="text-2xl">SSR for a response at the speed of the Yellow Flash</p>
</div>

<br>

<p class="text-sm">Why Angular? Because the Hidden Leaf Village needs a robust and scalable foundation. And we use SSR (Server-Side Rendering) for the same reason Minato used his Hiraishin no Jutsu: to get an almost instant initial response! The first mission appears on the screen immediately, without delay.</p>

<!--
Why Angular? Because the Hidden Leaf Village needs a robust and scalable foundation. And we use SSR (Server-Side Rendering) for the same reason Minato used his Hiraishin no Jutsu: to get an almost instant initial response! The first mission appears on the screen immediately, without delay.
-->

---
layout: two-cols
---

# Signals - The Byakugan of the Frontend

<br>

<div class="text-center">
  <img src="/images/byakugan.jpg.webp" alt="Byakugan" class="h-48 mx-auto">
</div>

::right::

<br>

```typescript
import { signal, computed } from '@angular/core';

const count = signal(0);
const double = computed(() => count() * 2);
```

<p class="text-sm">For reactivity, we use Signals. Think of them as the Hyuga Clan's Byakugan: they see *exactly* the chakra points of the UI that have changed and update only those. It's surgical precision, without unnecessary re-renders. Maximum chakra efficiency!</p>

<!--
For reactivity, we use Signals. Think of them as the Hyuga Clan's Byakugan: they see *exactly* the chakra points of the UI that have changed and update only those. It's surgical precision, without unnecessary re-renders. Maximum chakra efficiency!
-->

---
layout: center
class: text-center
---

# Gemini CLI - The Quick Summoning Jutsu

<br>

<div class="bg-black text-white p-4 rounded-lg">
  <pre class="text-left"><code class="language-bash">$ gemini init hokage-advisor</code></pre>
</div>

<br>

<p class="text-sm">It all starts with the **Gemini CLI**. It's like a summoning scroll: with one command, you have the entire AI project structure ready. It sets up the environment, the configurations... it's the fastest way to start your mission, without having to read a thousand documentation scrolls.</p>

<!--
It all starts with the **Gemini CLI**. It's like a summoning scroll: with one command, you have the entire AI project structure ready. It sets up the environment, the configurations... it's the fastest way to start your mission, without having to read a thousand documentation scrolls.
-->

---
layout: two-cols
---

# Genkit - Your Jounin Team

<br>

<div class="text-center">
  <img src="/images/kakashi.jpeg" alt="Kakashi" class="h-48 mx-auto">
</div>

::right::

<br>

<p class="text-sm">If Gemini is the raw power of the Rasengan, **Genkit is Kakashi**: the tactical leader who orchestrates everything. It defines the `flows` (our mission strategies), adds logs to let us know what happened (like a sensor ninja), and ensures the operation is a success. It's the brain of the operation.</p>


<!--
If Gemini is the raw power of the Rasengan, **Genkit is Kakashi**: the tactical leader who orchestrates everything. It defines the `flows` (our mission strategies), adds logs to let us know what happened (like a sensor ninja), and ensures the operation is a success. It's the brain of the operation.
-->

---
layout: image-right
image: /images/secret-scroll.jpg
---

# The Secret Scroll - The Art of the Prompt

<br>

> "Act as a Hokage advisor. Create a creative ninja mission, describe it, classify its rank from D to S, and suggest 3 qualified Hidden Leaf Village ninjas for the mission."

<br>

<p class="text-sm">This is the heart of our AI jutsu: the prompt. This is where we give instructions to Gemini. The quality of your scroll defines the quality of the jutsu!</p>

<!--
This is the heart of our AI jutsu: the prompt. This is where we give instructions to Gemini. 'Act as a Hokage advisor. Create a creative ninja mission, describe it, classify its rank from D to S, and suggest 3 qualified Hidden Leaf Village ninjas for the mission.' The quality of your scroll defines the quality of the jutsu!
-->

---
layout: center
class: text-center
---

# Mission Complete! LIVE DEMO

<br>

<div class="text-4xl font-bold">
  LIVE DEMO
</div>

<br>

<!--
Enough talk, let's see the Hokage Advisor in action! Let's ask for a new mission... *clicks the button*. And... done! Rank-A Mission: 'Infiltrate the Hidden Rain Village to investigate rumors about a new leader'. Suggested team: Sai, Yamato, and Shino Aburame. The Hokage just saved 30 minutes. Success!
-->

---
layout: image-right
image: /images/lamen.jpg
---

# What Did We Learn on Today's Mission?

<br>

- **Angular with SSR and Signals** creates frontends with the speed of the Yellow Flash.
- **Genkit** makes AI orchestration less scary than facing Orochimaru.
- **AI is not about replacing the Hokage**, it's about giving him the tools to be a better leader... and have time to eat good ramen.

<!--
So, what did we learn? First, **Angular with SSR and Signals** creates frontends with the speed of the Yellow Flash. Second, **Genkit** makes AI orchestration less scary than facing Orochimaru. And most importantly: **AI is not about replacing the Hokage**, it's about giving him the tools to be a better leader... and have time to eat good ramen.
-->

---
layout: default
---

# Your Next Mission

<br>

<div class="grid grid-cols-3 gap-8 text-center">
  <div>
    <img src="/images/qr-github.png" alt="QR Code for the project repository on GitHub" class="mx-auto">
    <p>GitHub Repository</p>
  </div>
  <div>
    <img src="/images/qr-genkit.png" alt="QR Code for Genkit documentation" class="mx-auto">
    <p>Genkit Documentation</p>
  </div>
  <div>
    <img src="/images/qr-linkedin.png" alt="QR Code for your LinkedIn" class="mx-auto">
    <p>My LinkedIn</p>
  </div>
</div>

<br>

<p class="text-sm">Now it's your turn! Grab these tools and create your own jutsus. The Hokage Advisor's code is available for you to study. Begin your journey to become the next Sages of AI!</p>

<!--
Now it's your turn! Grab these tools and create your own jutsus. The Hokage Advisor's code is available for you to study. Begin your journey to become the next Sages of AI!
-->

---
layout: center
class: text-center
---

# Mission End! Questions?

<br>

<img src="/images/naruto-thumbs-up.jpg" alt="Naruto Thumbs Up" class="h-64 mx-auto">

<br>

<p>Alvaro Camillo Neto</p>
<p><a href="https://www.linkedin.com/in/alvarocamillont/">linkedin.com/in/alvarocamillont</a></p>
<p><a href="https://x.com/alvarocamillont">@alvarocamillont</a></p>

<!--
Mission accomplished! Thank you very much, everyone. Now, I'm here to answer any questions you may have. Bring them on! Dattebayo!
-->
