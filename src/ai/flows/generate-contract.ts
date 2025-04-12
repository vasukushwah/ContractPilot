'use server';
/**
 * @fileOverview Generates a contract draft based on project details provided by the user.
 *
 * - generateContract - A function that generates a contract draft.
 * - ContractDetailsInput - The input type for the generateContract function.
 * - ContractDraftOutput - The return type for the generateContract function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ContractDetailsInputSchema = z.object({
  freelancerDetails: z.string().describe('Details of the freelancer providing the service.'),
  clientDetails: z.string().describe('Details of the client receiving the service.'),
  serviceDescription: z.string().describe('Detailed description of the service being provided.'),
  paymentTerms: z.string().describe('Details of the payment terms, including amount and schedule.'),
  governingLaw: z.string().describe('The governing law for the contract (e.g., California law).').default('California law'),
});

export type ContractDetailsInput = z.infer<typeof ContractDetailsInputSchema>;

const ContractDraftOutputSchema = z.object({
  contractDraft: z.string().describe('The generated contract draft.'),
});

export type ContractDraftOutput = z.infer<typeof ContractDraftOutputSchema>;

export async function generateContract(input: ContractDetailsInput): Promise<ContractDraftOutput> {
  return generateContractFlow(input);
}

const generateContractPrompt = ai.definePrompt({
  name: 'generateContractPrompt',
  input: {
    schema: z.object({
      freelancerDetails: z.string().describe('Details of the freelancer providing the service.'),
      clientDetails: z.string().describe('Details of the client receiving the service.'),
      serviceDescription: z.string().describe('Detailed description of the service being provided.'),
      paymentTerms: z.string().describe('Details of the payment terms, including amount and schedule.'),
      governingLaw: z.string().describe('The governing law for the contract.'),
    }),
  },
  output: {
    schema: z.object({
      contractDraft: z.string().describe('The generated contract draft.'),
    }),
  },
  prompt: `You are an expert contract lawyer. Generate a contract based on the following details. Use appropriate legal jargon and format the contract in a professional manner. Be sure to include all necessary clauses and terms to protect both parties. The governing law is {{{governingLaw}}}.

Freelancer Details: {{{freelancerDetails}}}
Client Details: {{{clientDetails}}}
Service Description: {{{serviceDescription}}}
Payment Terms: {{{paymentTerms}}}`,
});

const generateContractFlow = ai.defineFlow<
  typeof ContractDetailsInputSchema,
  typeof ContractDraftOutputSchema
>(
  {
    name: 'generateContractFlow',
    inputSchema: ContractDetailsInputSchema,
    outputSchema: ContractDraftOutputSchema,
  },
  async input => {
    const {output} = await generateContractPrompt(input);
    return output!;
  }
);
