# Tutorial: Creando el Hokage Desk con Angular y Genkit

¡Bienvenido al Hokage Desk! Este tutorial te guiará a través del proceso de creación de una aplicación Angular con un backend impulsado por IA usando Genkit de Google.

## Prerrequisitos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu máquina:

*   **Node.js:** https://nodejs.org/
*   **Angular CLI:** `npm install -g @angular/cli`
*   **Git:** https://git-scm.com/

### Obteniendo una Clave de API de Gemini

1.  Accede a [Google AI Studio](https://aistudio.google.com/app) (anteriormente conocido como "Build with Google").
2.  Inicia sesión con tu cuenta de Google.
3.  Haz clic en **"Get API key"** en el menú de la izquierda.
4.  Haz clic en **"Create API key in new project"**.
5.  Copia la clave de API generada.

### Configurando la Variable de Entorno

Genkit lee la clave de API de una variable de entorno. Crea una variable de entorno, reemplazando `<SUA_API_KEY>` por la clave que copiaste:

```
GOOGLE_API_KEY=<TU_API_KEY>
```

## 1. Creando el Proyecto Angular

Comenzaremos creando un nuevo proyecto Angular con Server-Side Rendering (SSR) activado por defecto.

```bash
ng new hokage-desk --ssr
```

Para el sistema de CSS, selecciona Tailwind.

Instala las demás dependencias del proyecto:

```bash
npm i genkit
npm i express@^4.21.1
npm i @genkit-ai/express
npm i @genkit-ai/google-genai
npm i zod@^3.25
```

## 2. Configurando el Flujo de Genkit

Ahora, vamos a crear el corazón de nuestra funcionalidad de IA.

### Crea el Archivo de Flujo

Crea un nuevo archivo llamado `flows.ts` dentro de la carpeta `src/`.

### Definiendo el Flujo

Abre `src/flows.ts` y añade el siguiente código:

```typescript
import { genkit } from 'genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';
import { v4 as uuidv4 } from 'uuid';

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash', {
    temperature: 0.8,
  }),
});

// Define input schema
export const MissionDefinitionSchema = z.object({
  definition: z.string().describe('Definition of the mission'),
});

// Define output schema
// Final schema for the Ninja Mission
export const missionSchema = z
  .object({
    id: z.string().describe('Unique identifier for the mission'),
    title: z.string().describe('A creative and fitting title for the mission.'),
    difficulty:
      z
        .string()
        .describe(
          'Classify the mission into one of the following ranks, based on its complexity and danger: D, C, B, A, or S.'
        ),
    missionValue:
      z
        .string()
        .describe(
          "Define a reward in Ryō. The value must be consistent with the mission's difficulty (e.g., Rank-D missions are low-value, Rank-S missions are very high-value)."
        ),
    detailedDescription:
      z
        .string()
        .describe(
          "Create a detailed, narrative-style mission briefing based on the user's initial input. It should include the background context, a clear primary objective, known risks or enemy intel, and the mission's location. This should read like an official mission scroll given to the team leader."
        ),
    ninjaTeamLevel:
      z
        .string()
        .describe(
          'Based on the mission\'s difficulty, suggest the team\'s rank. Use standard Naruto ranks like Genin, Chunin, Jonin, or ANBU. For legendary missions, you could even specify Sannin ou Kage-level.'
        ),
    assignedTeam:
      z
        .string()
        .describe(
          "Assign a suitable team. If a known, official team from the Naruto or Boruto universe fits the mission and members (e.g., 'Team 7', 'Ino-Shika-Cho', 'Team Guy'), use its official name. If no existing team is a perfect fit, create a new, thematic squad name (e.g., 'Sand Village Barrier Unit', 'Mist Village Cipher Squad')."
        ),
    teamMembers:
      z
        .array(
          z.object({
            name:
              z
                .string()
                .describe(
                  "Select a real character from the Naruto or Boruto anime who would be suitable for this mission's rank and objective."
                ),
            specialty:
              z
                .string()
                .describe(
                  "State this character's known signature jutsu or primary skill (e.g., 'Rasengan', 'Sharingan', 'Byakugan', 'Shadow Possession Jutsu')."
                ),
          })
        )
        .describe(
          'A list containing exactly 3 members for the ninja team. The members chosen must be real characters from Naruto or Boruto.'
        ),
  })
  .describe('The complete mission file in JSON format.');

// Define a recipe generator flow
export const missionGeneratorFlow = ai.defineFlow(
  {
    name: 'missionGeneratorFlow',
    inputSchema: MissionDefinitionSchema,
    outputSchema: missionSchema,
  },
  async (input) => {
    // Create a prompt based on the input
    const prompt = `
        You are a mission assignment expert from Konohagakure, with deep knowledge of every shinobi and official team from both the Naruto and Boruto eras.
        Your primary task is to take a brief mission concept and expand it into a complete, official mission file. The initial concept from the user is: "${input.definition}".
        All generated content must be in the same language as the user's input.

        IMPORTANT LOGIC:
        1.  Generate a creative and fitting title for the mission.
        2.  Elaborate on the user's concept to create a detailed mission description, including background, objectives, and known risks.
        3.  Select REAL characters from the Naruto or Boruto universe for the team. The team composition must be logical for the mission's assigned difficulty. Do not assign Kage-level shinobi to a D-rank mission.
        4.  For the team name, prioritize using an official team name (e.g., 'Team 7') if the members align. Otherwise, create a fitting squad name.

        Generate the output in the requested JSON format.
      `;

    // Generate structured recipe data using the same schema
    const { output } = await ai.generate({
      prompt,
      output: { schema: missionSchema },
    });

    if (!output) throw new Error('Failed to generate recipe');

    return {
      ...output,
      id: uuidv4(),
    };
  }
);

```

Este código:
1.  Configura Genkit para usar el plugin de Google AI.
2.  Define un `system prompt` detallado para guiar el modelo de IA.
3.  Usa Zod para crear esquemas de validación para la entrada y salida de nuestro flujo.
4.  Crea el `missionGeneratorFlow`, que recibe una definición de misión como entrada y usa el modelo `gemini-2.5-flash` para generar una lista de misiones en formato JSON.

## 3. Creando el Endpoint de la API

Con el flujo de Genkit listo, necesitamos un endpoint en nuestro servidor Angular SSR para activarlo.

Abre el archivo `src/server.ts`:

```typescript
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { missionGeneratorFlow } from './flows';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.post('/api/mission', async (req, res) => {
  try {
    const result = await missionGeneratorFlow(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Código del servidor continúa ...

```

Este fragmento de código crea una ruta POST `/api/mission`. Cuando se llama a esta ruta con una definición de misión en el cuerpo de la solicitud, ejecuta el `missionGeneratorFlow` y devuelve las misiones generadas como respuesta.

## 4. Creando el Servicio de Misiones en Angular

Ahora, en la parte del frontend, vamos a crear un servicio para gestionar el estado de nuestras misiones.

### Genera el Servicio

Usa Angular CLI para crear un nuevo servicio:

```bash
ng generate service mission
```

### Implementa el Servicio

Abre el archivo recién creado `src/app/mission.ts` y añade el siguiente código:

```typescript

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { take } from 'rxjs';

export interface Mission {
  id: string;
  title: string;
  difficulty: string;
  missionValue: string;
  detailedDescription: string;
  ninjaTeamLevel: string;
  assignedTeam: string;
  teamMembers: {
    name: string;
    specialty: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  missions = signal<Mission[]>([]);
  loading = signal(false);

  private readonly http = inject(HttpClient);

  createMission(definition: string) {
    this.loading.set(true);
    this.http
      .post<Mission>('/api/mission', { definition })
      .pipe(take(1))
      .subscribe((response) => {
        this.missions.update((missions) => [...missions, response]);
        this.loading.set(false);
      });
  }

  getMissionById(id: string) {
    return computed(() => this.missions().find((mission) => mission.id === id));
  }
}
```

Este servicio:
1.  Usa una `signal` (`missions`) para almacenar la lista de misiones de forma reactiva.
2.  Expone un `loading` para señalar si la solicitud de la API ha sido completada.
3.  Tiene el método `createMission`, que realiza una solicitud POST a nuestro endpoint `/api/mission` y actualiza las `missions` con la respuesta.
4.  Tiene el método `getMissionById`, que busca una misión específica en la lista por su ID.

## 5. Creando los Componentes de la Interfaz

Finalmente, vamos a crear los componentes para mostrar las misiones.

### Configura el index

Abre el archivo `src/index.html` y añade la referencia al archivo del tema:

```html
<!doctype html>
<html lang="en" class="dark">
<head>
  <meta charset="utf-8">
  <title>HokageDesk</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body class="bg-background-dark font-display text-gray-100">
  <app-root></app-root>
</body>
</html>

```


### Configura Tailwind

Crea el archivo `src/theme.css` y configura Tailwind como se muestra a continuación:

```css
@theme {
  --color-primary: #4A6741;
  --color-background-light: #FDFBF5;
  --color-background-dark: #2D2D2D;
  --color-card-dark: #3C3C3C;
  --color-leaf-green: #4A5C43;
  --color-leaf-green-dark: #3A4A35;
  --color-text-light: #2D3748;
  --color-text-dark: #E2E8F0;

  --font-display: "Space Grotesk", sans-serif;

  --radius: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;
}
```

Abre el archivo `src/styles.css` y añade la referencia al archivo del tema:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import "tailwindcss";
@import "./theme.css";
```

### Genera los Componentes

```bash
ng generate component dashboard
ng generate component detail
```

### Configurando las Rutas

Abre el archivo `src/app/app.routes.ts` y configura las rutas para los nuevos componentes:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard) },
    { path: 'detail/:id', loadComponent: () => import('./detail/detail').then(c => c.Detail) },
];

```

Abre el archivo `src/app/app.html` y reemplaza el contenido generado por Angular CLI con el siguiente código:

```html
<router-outlet></router-outlet>
```

### Implementando el `Dashboard`

Este componente tendrá un formulario para introducir la definición de la misión y mostrará la lista de misiones generadas.

**`src/app/dashboard/dashboard.ts`**
```typescript
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MissionService } from '../mission.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class Dashboard {
  private readonly missionService = inject(MissionService);

  missionDefinition = signal('');
  missions = this.missionService.missions;
  loading = this.missionService.loading;

  createMission() {
    this.missionService.createMission(this.missionDefinition());
    this.missionDefinition.set('');
    console.log(this.missions())
  }
}
```

**`src/app/dashboard/dashboard.css`**
```css
.avatar-stack > div {
  margin-left: -0.75rem;
}
.avatar-stack > div:first-child {
  margin-left: 0;
}
```

**`src/app/dashboard/dashboard.html`**
```html
<div class="min-h-screen w-full p-4 sm:p-6 md:p-8">
  <div class="mx-auto max-w-5xl">
    <header class="text-center mb-8 md:mb-12">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Genkit-Jutsu: Mission Generator</h1>
    </header>
    <main>
      <section class="mb-10 md:mb-16">
        <div class="bg-card-dark p-6 sm:p-8 rounded-xl shadow-lg">
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2" for="mission-directive">Mission
                Directive</label>
              <textarea
                [ngModel]="missionDefinition()" (ngModelChange)="missionDefinition.set($event)"
                [disabled]="loading()"
                class="w-full border rounded-lg border-gray-600 bg-gray-700/50 focus:border-primary focus:ring-primary placeholder:text-gray-500 py-2 px-3 "
                id="mission-directive" name="mission-directive"
                placeholder="Describe the mission objectives, targets, and any special considerations..."
                rows="4"></textarea>
            </div>

            <button
              (click)="createMission()"
              [disabled]="loading()"
              class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-dark focus:ring-primary transition-colors"
              type="button">
              @if (loading()) {
                <div class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </div>
              } @else {
                <span>Generate Mission Scroll</span>
              }
            </button>
          </form>
        </div>
      </section>
      <section>
        <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-white">Generated Mission Scrolls</h2>
        @defer (on immediate) {
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (mission of missions(); track mission.id) {
              <a [routerLink]="['/detail', mission.id]" class="bg-background-light p-6 rounded-xl shadow-md flex flex-col space-y-4 cursor-pointer hover:bg-primary/10 transition-colors">
                <div class="flex-grow">
                  <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-gray-800">{{ mission.title }}</h3>
                    <span
                      class="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Rank
                      {{ mission.difficulty }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <p class="text-sm text-gray-600">Assigned Team: {{ mission.assignedTeam }}</p>
                  </div>
                </div>
              </a>
            }
          </div>
        } @loading {
          <div class="flex justify-center items-center">
            <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }
      </section>
    </main>
  </div>
</div>
```

### Implementando el `Detail`

Este componente mostrará los detalles de una misión seleccionada.

**`src/app/detail/detail.ts`**
```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../mission';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Detail {
  private readonly route = inject(ActivatedRoute);
  private readonly missionService = inject(MissionService);

  mission = this.missionService.getMissionById(
    this.route.snapshot.paramMap.get('id')!
  );
}

```

**`src/app/detail/detail.css`**
```css
.custom-red-chip {
    background-color: #991b1b;
}
.custom-blue-chip {
    background-color: #1e3a8a;
}
```

**`src/app/detail/detail.html`**
```html
<div class="min-h-screen flex items-center justify-center p-4">
    @if (mission(); as vm) {
        <main
            class="w-full max-w-4xl bg-primary text-text-light dark:bg-gray-800 dark:text-text-dark rounded-xl shadow-lg p-6 md:p-8">
            <header class="mb-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 class="text-3xl md:text-4xl font-bold text-leaf-green dark:text-leaf-green-dark">{{ vm.title }}</h1>
                    <div class="flex items-center gap-3">
                        <span class="custom-red-chip text-white text-xs font-bold px-3 py-1 rounded-full">Rank {{ vm.difficulty }}</span>
                        <span class="custom-blue-chip text-white text-xs font-bold px-3 py-1 rounded-full">{{ vm.ninjaTeamLevel }}</span>
                    </div>
                </div>
            </header>
            <div class="space-y-8">
                <section>
                    <h2 class="text-xl font-bold mb-2 text-leaf-green dark:text-leaf-green-dark">Mission Briefing</h2>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {{ vm.detailedDescription }}
                    </p>
                </section>
                <section>
                    <h2 class="text-xl font-bold mb-2 text-leaf-green dark:text-leaf-green-dark">Mission Value</h2>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-2xl text-leaf-green dark:text-leaf-green-dark">
                            account_balance_wallet
                        </span>
                        <p class="text-lg font-bold text-gray-700 dark:text-gray-300">{{ vm.missionValue }}</p>
                    </div>
                </section>
                <section>
                    <h2 class="text-xl font-bold mb-4 text-leaf-green dark:text-leaf-green-dark">Assigned Team: {{ vm.assignedTeam }}
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        @for (team of vm.teamMembers; track team) {
                            <div
                                class="flex flex-col items-center p-4 bg-background-light dark:bg-gray-700 rounded-lg shadow-sm">
                                <h3 class="font-bold text-lg text-text-light dark:text-text-dark">{{ team.name }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ team.specialty }}</p>
                            </div>
                        }
                    </div>
                </section>
            </div>
        </main>
    }
</div>
```

## Conclusión

¡Felicidades! Has construido una aplicación Angular completa que utiliza Genkit para generar contenido dinámico con IA.

Para ejecutar tu aplicación:

```bash
npm start
```

Accede a `http://localhost:4200` en tu navegador, escribe la descripción de la misión y ¡observa la IA en acción!

```