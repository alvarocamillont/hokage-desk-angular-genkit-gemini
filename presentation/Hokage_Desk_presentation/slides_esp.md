theme: seriph
background: /images/cover.webp
title: '¡Misión: Salvar al Hokage!'
info: |
  ## Angular & IA en Acción: Construyendo el Asesor del Hokage
  Dominando el Arte Ninja de la IA con Angular, Genkit y Gemini
class: text-center
transition: slide-left
mdc: true
duration: 45min
---

# ¡Misión: Salvar al Hokage!

## Dominando el Arte Ninja de la IA con Angular, Genkit y Gemini

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Presiona Espacio para la siguiente página <carbon:arrow-right class="inline"/>
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
  <p class="text-xs">Jounin Especialista en Angular e IA de la Aldea Oculta de la Hoja (Banco Santander)</p>
</div>

<!--
(Sube al escenario con energía) ¡Hola a todos! Mi nombre es Alvaro Camillo Neto, y soy un Jounin Especialista en Angular e IA, reportando directamente desde la Aldea Oculta de la Hoja, en la Tierra del Fuego... también conocida como Banco Santander. Hoy, nuestra misión es una de las más importantes jamás asignadas: usaremos nuestro ninjutsu de código para salvar al Séptimo Hokage de su mayor enemigo... ¡el papeleo!
-->

---
layout: image-right
image: /images/naruto-paperwork.jpg.webp
---

# El Peor Enemigo del Hokage

<br>

El héroe de la Cuarta Gran Guerra Ninja...

El hombre que selló a Kaguya...

...derrotado por informes.

<br>

<!--
Piensen en esto. El héroe de la Cuarta Gran Guerra Ninja... el hombre que selló a Kaguya... derrotado por informes. Generar misiones, clasificar rangos, armar equipos... es un proceso manual, lento y que drena el chakra de cualquiera. ¡Es el 'Jutsu Prohibido del Papeleo Infinito'! ¡Y la situación solo empeora en la era Boruto!
-->

---
layout: center
class: text-center
---

# Presentando el "Consejero Hokage"

<br>

<div class="text-4xl font-bold">
  Consejero Hokage
</div>

<br>

<p class="text-sm">Una aplicación que usa Inteligencia Artificial para ayudar a nuestro héroe a:</p>
<p class="text-sm">Primero, generar misiones ninja automáticamente.</p>
<p class="text-sm">Y segundo, clasificar el rango de la misión y sugerir el equipo perfecto para ella.</p>
<p class="text-sm">¡Se acabó el sufrimiento!</p>

<!--
¡Es por eso que creamos el **Consejero Hokage**! Una aplicación que usa Inteligencia Artificial para ayudar a nuestro héroe a: Primero, generar misiones ninja automáticamente. Y segundo, clasificar el rango de la misión y sugerir el equipo perfecto para ella. ¡Se acabó el sufrimiento!
-->

---
layout: intro
---

# La Arquitectura Ninja

<div class="grid grid-cols-3 gap-8">
  <div class="text-center">
    <img src="/images/angular-logo.svg" alt="Angular" class="h-24 mx-auto">
    <p class="font-bold">Aldea Oculta de la Hoja (Frontend)</p>
  </div>
  <div class="text-center">
    <img src="/images/genkit-logo-dark.png" alt="Genkit" class="h-24 mx-auto">
    <p class="font-bold">Centro de Comando ANBU (Orquestación)</p>
  </div>
  <div class="text-center">
    <img src="/images/gemini-aurora.png" alt="Gemini" class="h-24 mx-auto">
    <p class="font-bold">El Sabio de los Seis Caminos (Inteligencia)</p>
  </div>
</div>

<!--
Para construir nuestra herramienta, usamos un arsenal shinobi de vanguardia. En nuestra Aldea (el frontend), tenemos **Angular**. Para orquestar nuestras técnicas (el backend), **Genkit**. Y para el poder de creación, invocamos el modo sabio con **Gemini**.
-->

---
layout: default
---

# Construyendo la Aldea con Angular y SSR

<br>

<div class="text-center">
  <img src="/images/angular-logo.svg" alt="Angular" class="h-48 mx-auto">
  <p class="text-2xl">SSR para una respuesta a la velocidad del Relámpago Amarillo</p>
</div>

<br>

<p class="text-sm">¿Por qué Angular? Porque la Aldea Oculta de la Hoja necesita una base robusta y escalable. Y usamos SSR (Server-Side Rendering) por la misma razón que Minato usaba su Hiraishin no Jutsu: ¡para tener una respuesta inicial casi instantánea! La primera misión ya aparece en pantalla, sin demora.</p>

<!--
¿Por qué Angular? Porque la Aldea Oculta de la Hoja necesita una base robusta y escalable. Y usamos SSR (Server-Side Rendering) por la misma razón que Minato usaba su Hiraishin no Jutsu: ¡para tener una respuesta inicial casi instantánea! La primera misión ya aparece en pantalla, sin demora.
-->

---
layout: two-cols
---

# Signals - El Byakugan del Frontend

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

<p class="text-sm">Para la reactividad, usamos Signals. Piensen en ellos como el Byakugan del Clan Hyuga: ven *exactamente* los puntos de chakra de la UI que cambiaron y actualizan solo eso. Es precisión quirúrgica, sin renderizaciones innecesarias. ¡Máxima eficiencia de chakra!</p>

<!--
Para la reactividad, usamos Signals. Piensen en ellos como el Byakugan del Clan Hyuga: ven *exactamente* los puntos de chakra de la UI que cambiaron y actualizan solo eso. Es precisión quirúrgica, sin renderizaciones innecesarias. ¡Máxima eficiencia de chakra!
-->

---
layout: center
class: text-center
---

# Gemini CLI - El Jutsu de Invocación Rápida

<br>

<div class="bg-black text-white p-4 rounded-lg">
  <pre class="text-left"><code class="language-bash">$ gemini init hokage-advisor</code></pre>
</div>

<br>

<p class="text-sm">Todo comienza con el **Gemini CLI**. Es como un pergamino de invocación: con un comando, tienes toda la estructura del proyecto de IA lista. Crea el entorno, las configuraciones... es la forma más rápida de comenzar tu misión, sin necesidad de leer mil pergaminos de documentación.</p>

<!--
Todo comienza con el **Gemini CLI**. Es como un pergamino de invocación: con un comando, tienes toda la estructura del proyecto de IA lista. Crea el entorno, las configuraciones... es la forma más rápida de comenzar tu misión, sin necesidad de leer mil pergaminos de documentación.
-->

---
layout: two-cols
---

# Genkit - Tu Equipo de Jounins

<br>

<div class="text-center">
  <img src="/images/kakashi.jpeg" alt="Kakashi" class="h-48 mx-auto">
</div>

::right::

<br>

<p class="text-sm">Si Gemini es el poder bruto del Rasengan, **Genkit es Kakashi**: el líder táctico que lo orquesta todo. Define los `flows` (nuestras estrategias de misión), añade registros para saber qué pasó (como un ninja sensor) y asegura que la operación sea un éxito. Es el cerebro de la operación.</p>


<!--
Si Gemini es el poder bruto del Rasengan, **Genkit es Kakashi**: el líder táctico que lo orquesta todo. Define los `flows` (nuestras estrategias de misión), añade registros para saber qué pasó (como un ninja sensor) y asegura que la operación sea un éxito. Es el cerebro de la operación.
-->

---
layout: image-right
image: /images/secret-scroll.jpg
---

# El Pergamino Secreto - El Arte del Prompt

<br>

> "Actúa como un consejero Hokage. Crea una misión ninja creativa, descríbela, clasifica su rango de D a S y sugiere 3 ninjas de la Aldea Oculta de la Hoja calificados para la misión."

<br>

<p class="text-sm">Este es el corazón de nuestro jutsu de IA: el prompt. Aquí es donde le damos las instrucciones a Gemini. ¡La calidad de tu pergamino define la calidad del jutsu!</p>

<!--
Este es el corazón de nuestro jutsu de IA: el prompt. Aquí es donde le damos las instrucciones a Gemini. 'Actúa como un consejero Hokage. Crea una misión ninja creativa, descríbela, clasifica su rango de D a S y sugiere 3 ninjas de la Aldea Oculta de la Hoja calificados para la misión.' ¡La calidad de tu pergamino define la calidad del jutsu!
-->

---
layout: center
class: text-center
---

# ¡Misión Completa! DEMO EN VIVO

<br>

<div class="text-4xl font-bold">
  DEMO EN VIVO
</div>

<br>

<!--
¡Basta de hablar, veamos al Consejero Hokage en acción! Pediremos una nueva misión... *clic en el botón*. Y... ¡listo! Misión Rango-A: 'Infiltrarse en la Aldea Oculta de la Lluvia para investigar rumores sobre un nuevo líder'. Sugerencia de equipo: Sai, Yamato y Shino Aburame. El Hokage acaba de ahorrar 30 minutos. ¡Éxito!
-->

---
layout: image-right
image: /images/lamen.jpg
---

# ¿Qué Aprendimos en la Misión de Hoy?

<br>

- **Angular con SSR y Signals** crea frontends con la velocidad del Relámpago Amarillo.
- **Genkit** hace que la orquestación de IA sea menos aterradora que enfrentarse a Orochimaru.
- **La IA no se trata de reemplazar al Hokage**, se trata de darle las herramientas para ser un mejor líder... y tener tiempo para comer un buen ramen.

<!--
Entonces, ¿qué aprendimos? Primero, **Angular con SSR y Signals** crea frontends con la velocidad del Relámpago Amarillo. Segundo, **Genkit** hace que la orquestación de IA sea menos aterradora que enfrentarse a Orochimaru. Y lo más importante: **La IA no se trata de reemplazar al Hokage**, se trata de darle las herramientas para ser un mejor líder... y tener tiempo para comer un buen ramen.
-->

---
layout: default
---

# Tu Próxima Misión

<br>

<div class="grid grid-cols-3 gap-8 text-center">
  <div>
    <img src="/images/qr-github.png" alt="Código QR para el repositorio del proyecto en GitHub" class="mx-auto">
    <p>Repositorio en GitHub</p>
  </div>
  <div>
    <img src="/images/qr-genkit.png" alt="Código QR para la documentación de Genkit" class="mx-auto">
    <p>Documentación de Genkit</p>
  </div>
  <div>
    <img src="/images/qr-linkedin.png" alt="Código QR para tu LinkedIn" class="mx-auto">
    <p>Mi LinkedIn</p>
  </div>
</div>

<br>

<p class="text-sm">¡Ahora es su turno! Tomen estas herramientas y creen sus propios jutsus. El código del Consejero Hokage está disponible para que lo estudien. ¡Comiencen su viaje para convertirse en los próximos Sabios de la IA!</p>

<!--
¡Ahora es su turno! Tomen estas herramientas y creen sus propios jutsus. El código del Consejero Hokage está disponible para que lo estudien. ¡Comiencen su viaje para convertirse en los próximos Sabios de la IA!
-->

---
layout: center
class: text-center
---

# ¡Fin de la Misión! ¿Preguntas?

<br>

<img src="/images/naruto-thumbs-up.jpg" alt="Naruto Pulgar Arriba" class="h-64 mx-auto">

<br>

<p>Alvaro Camillo Neto</p>
<p><a href="https://www.linkedin.com/in/alvarocamillont/">linkedin.com/in/alvarocamillont</a></p>
<p><a href="https://x.com/alvarocamillont">@alvarocamillont</a></p>

<!--
¡Misión cumplida! Muchas gracias, a todos. Ahora, estoy aquí para responder cualquier pregunta que tengan. ¡Adelante! ¡Dattebayo!
-->
