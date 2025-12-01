# Tutorial: Creating the Hokage Desk with Angular and Genkit

Welcome to Hokage Desk! This tutorial will guide you through the process of creating an Angular application with an AI-powered backend using Google's Genkit.

## Prerequisites

Before we begin, make sure you have the following tools installed on your machine:

*   **Node.js:** https://nodejs.org/
*   **Angular CLI:** `npm install -g @angular/cli`
*   **Git:** https://git-scm.com/

### Obtaining a Gemini API Key

1.  Access [Google AI Studio](https://aistudio.google.com/app) (formerly known as "Build with Google").
2.  Log in with your Google account.
3.  Click on **"Get API key"** in the left menu.
4.  Click on **"Create API key in new project"**.
5.  Copy the generated API key.

### Setting up the Environment Variable

Genkit reads the API key from an environment variable. Create an environment variable, replacing `<YOUR_API_KEY>` with the key you copied:

```
GOOGLE_API_KEY=<YOUR_API_KEY>
```

## 1. Creating the Angular Project

Let's start by creating a new Angular project with Server-Side Rendering (SSR) enabled by default.

```bash
ng new hokage-desk --ssr
```

For the CSS system, select Tailwind.

Install the other project dependencies:

```bash
npm i genkit
npm i express@^4.21.1
npm i @genkit-ai/express
npm i @genkit-ai/google-genai
npm i zod@^3.25
```

## 2. Configuring the Genkit Flow

Now, let's create the heart of our AI functionality.

### Create the Flow File

Create a new file named `flows.ts` inside the `src/` folder.

### Defining the Flow

Open `src/flows.ts` and add the following code:

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

This code:
1.  Configures Genkit to use the Google AI plugin.
2.  Defines a detailed `system prompt` to guide the AI model.
3.  Uses Zod to create validation schemas for our flow's input and output.
4.  Creates the `missionGeneratorFlow`, which takes a mission definition as input and uses the `gemini-2.5-flash` model to generate a list of missions in JSON format.

## 3. Creating the API Endpoint

With the Genkit flow ready, we need an endpoint in our Angular SSR server to trigger it.

Open the `src/server.ts` file:

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

// Server code continues ...

```

This code snippet creates a POST route `/api/mission`. When this route is called with a mission definition in the request body, it executes the `missionGeneratorFlow` and returns the generated missions as a response.

## 4. Creating the Mission Service in Angular

Now, on the frontend side, let's create a service to manage the state of our missions.

### Generate the Service

Use the Angular CLI to create a new service:

```bash
ng generate service mission
```

### Implement the Service

Open the newly created file `src/app/mission.ts` and add the following code:

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

This service:
1.  Uses a `signal` (`missions`) to store the list of missions reactively.
2.  Exposes a `loading` signal to indicate if the API request has completed.
3.  Has the `createMission` method, which makes a POST request to our `/api/mission` endpoint and updates `missions` with the response.
4.  Has the `getMissionById` method, which searches for a specific mission in the list by its ID.

## 5. Creating the Interface Components

Finally, let's create the components to display the missions.

### Configure the index

Open the `src/index.html` file and add the theme file reference:

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


### Configure Tailwind

Create the `src/theme.css` file and configure Tailwind as follows:

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

Open the `src/styles.css` file and add the theme file reference:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import "tailwindcss";
@import "./theme.css";
```

### Generate the Components

```bash
ng generate component dashboard
ng generate component detail
```

### Configuring the Routes

Open the `src/app/app.routes.ts` file and configure the routes for the new components:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard) },
    { path: 'detail/:id', loadComponent: () => import('./detail/detail').then(c => c.Detail) },
];

```

Open the `src/app/app.html` file and replace the content generated by Angular CLI with the following code:

```html
<router-outlet></router-outlet>
```

### Implementing the `Dashboard`

This component will have a form to enter the mission definition and will display the list of generated missions.

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

### Implementing the `Detail`

This component will display the details of a selected mission.

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

## Conclusion

Congratulations! You have built a complete Angular application that uses Genkit to generate dynamic content with AI.

To run your application:

```bash
npm start
```

Access `http://localhost:4200` in your browser, type the mission description, and see the AI in action!

