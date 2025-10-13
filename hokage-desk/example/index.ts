


// Initialize Genkit with the Google AI plugin
import {genkit, z} from "genkit";
import {googleAI} from "@genkit-ai/google-genai";

const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash', {
        temperature: 0.8,
    }),
});

// Define input schema
const MissionDefinitionSchema = z.object({
    definition: z.string().describe('Definition of the mission'),
    language: z.string().optional().describe('Output language'),
});

// Define output schema
// Final schema for the Ninja Mission
export const missionSchema = z.object({
    difficulty: z
        .string()
        .describe(
            "Classify the mission into one of the following ranks, based on its complexity and danger: D, C, B, A, or S."
        ),
    missionValue: z
        .string()
        .describe(
            "Define a reward in Ryō. The value must be consistent with the mission's difficulty (e.g., Rank-D missions are low-value, Rank-S missions are very high-value)."
        ),
    detailedDescription: z
        .string()
        .describe(
            "Create a detailed, narrative-style mission briefing based on the user's initial input. It should include the background context, a clear primary objective, known risks or enemy intel, and the mission's location. This should read like an official mission scroll given to the team leader."
        ),
    ninjaTeamLevel: z
        .string()
        .describe(
            "Based on the mission's difficulty, suggest the team's rank. Use standard Naruto ranks like Genin, Chunin, Jonin, or ANBU. For legendary missions, you could even specify Sannin ou Kage-level."
        ),
    assignedTeam: z
        .string()
        .describe(
            "Assign a suitable team. If a known, official team from the Naruto or Boruto universe fits the mission and members (e.g., 'Team 7', 'Ino-Shika-Cho', 'Team Guy'), use its official name. If no existing team is a perfect fit, create a new, thematic squad name (e.g., 'Sand Village Barrier Unit', 'Mist Village Cipher Squad')."
        ),
    teamMembers: z
        .array(
            z.object({
                name: z
                    .string()
                    .describe(
                        "Select a real character from the Naruto or Boruto anime who would be suitable for this mission's rank and objective."
                    ),
                specialty: z
                    .string()
                    .describe(
                        "State this character's known signature jutsu or primary skill (e.g., 'Rasengan', 'Sharingan', 'Byakugan', 'Shadow Possession Jutsu')."
                    ),
            })
        )
        .describe("A list containing exactly 3 members for the ninja team. The members chosen must be real characters from Naruto or Boruto."),
}).describe("The complete mission file in JSON format.");

// Define a recipe generator flow
export const missionGeneratorFlow = ai.defineFlow(
    {
        name: 'missionGeneratorFlow',
        inputSchema: MissionDefinitionSchema,
        outputSchema: missionSchema,
    },
    async (input) => {
        // Create a prompt based on the input
        const prompt =`
        You are a mission assignment expert from Konohagakure, with deep knowledge of every shinobi and official team from both the Naruto and Boruto eras.
        Your primary task is to take a brief mission concept and expand it into a complete, official mission file. The initial concept from the user is: "${input.definition}".
        All generated content must be in the following language: ${input.language || 'English'}.

        IMPORTANT LOGIC:
        1.  Elaborate on the user's concept to create a detailed mission description, including background, objectives, and known risks.
        2.  Select REAL characters from the Naruto or Boruto universe for the team. The team composition must be logical for the mission's assigned difficulty. Do not assign Kage-level shinobi to a D-rank mission.
        3.  For the team name, prioritize using an official team name (e.g., 'Team 7') if the members align. Otherwise, create a fitting squad name.

        Generate the output in the requested JSON format.
      `

        // Generate structured recipe data using the same schema
        const { output } = await ai.generate({
            prompt,
            output: { schema: missionSchema },
        });

        if (!output) throw new Error('Failed to generate recipe');

        return output;
    },
);

// Run the flow
async function main() {
    const recipe = await missionGeneratorFlow({
        definition: 'Derrotar besta de 8 Caldas que está atacando a cidade',
        language: 'spanish',
    });

    console.log(recipe);
}

main().catch(console.error);