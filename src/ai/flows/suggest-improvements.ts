// src/ai/flows/suggest-improvements.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting improvements to a contract.
 *
 * - suggestImprovements - A function that takes a contract text as input and returns improvement suggestions.
 * - SuggestImprovementsInput - The input type for the suggestImprovements function.
 * - SuggestImprovementsOutput - The return type for the suggestImprovements function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  contractText: z.string().describe('The text of the contract to improve.'),
});
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;

const SuggestImprovementsOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A suggestion for improving the contract.')
  ).describe('A list of suggestions for improving the contract.'),
});
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  return suggestImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementsPrompt',
  input: {
    schema: z.object({
      contractText: z.string().describe('The text of the contract to improve.'),
    }),
  },
  output: {
    schema: z.object({
      suggestions: z.array(
        z.string().describe('A suggestion for improving the contract.')
      ).describe('A list of suggestions for improving the contract.'),
    }),
  },
  prompt: `You are an AI legal assistant reviewing contracts.

  Please review the following contract and provide a list of suggestions for improvement. These suggestions can include missing clauses, better wording, or areas where the contract is unclear.

  Contract:
  {{contractText}}

  Suggestions:`,
});

const suggestImprovementsFlow = ai.defineFlow<
  typeof SuggestImprovementsInputSchema,
  typeof SuggestImprovementsOutputSchema
>({
  name: 'suggestImprovementsFlow',
  inputSchema: SuggestImprovementsInputSchema,
  outputSchema: SuggestImprovementsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
