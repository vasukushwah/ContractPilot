
'use client';

import React, {useState} from 'react';
import {generateContract} from '@/ai/flows/generate-contract';
import {suggestImprovements} from '@/ai/flows/suggest-improvements';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";

const ContractGenerator: React.FC = () => {
  const [freelancerDetails, setFreelancerDetails] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [contractDraft, setContractDraft] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const {toast} = useToast();

  const handleGenerateContract = async () => {
    try {
      const contractData = await generateContract({
        freelancerDetails,
        clientDetails,
        serviceDescription,
        paymentTerms,
      });
      setContractDraft(contractData.contractDraft);
      toast({
        title: "Contract generated successfully!",
      });
    } catch (error) {
      console.error("Error generating contract:", error);
      toast({
        title: "Error",
        description: "Failed to generate contract. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGetSuggestions = async () => {
    try {
      const improvements = await suggestImprovements({contractText: contractDraft});
      setSuggestions(improvements.suggestions);
      toast({
        title: "AI Suggestions generated successfully!",
      });
    } catch (error) {
      console.error("Error getting suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadContract = () => {
    const blob = new Blob([contractDraft], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Contract downloaded successfully!",
    });
  };

  return (
    <Card className="w-[90%] max-w-4xl shadow-md p-4">
      <CardHeader>
        <CardTitle>Contract Generator</CardTitle>
        <CardDescription>Fill in the details to generate your contract.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="freelancerDetails">Freelancer Details</Label>
          <Input
            id="freelancerDetails"
            value={freelancerDetails}
            onChange={(e) => setFreelancerDetails(e.target.value)}
            placeholder="Enter freelancer details"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="clientDetails">Client Details</Label>
          <Input
            id="clientDetails"
            value={clientDetails}
            onChange={(e) => setClientDetails(e.target.value)}
            placeholder="Enter client details"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="serviceDescription">Service Description</Label>
          <Textarea
            id="serviceDescription"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            placeholder="Enter service description"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Input
            id="paymentTerms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            placeholder="Enter payment terms"
          />
        </div>
        <Button onClick={handleGenerateContract} className="bg-primary text-primary-foreground hover:bg-primary/80">
          Generate Contract
        </Button>
        {contractDraft && (
          <div className="grid gap-2">
            <Label htmlFor="contractDraft">Contract Draft</Label>
            <Textarea
              id="contractDraft"
              value={contractDraft}
              onChange={(e) => setContractDraft(e.target.value)}
              placeholder="Contract will appear here"
              className="min-h-[200px]"
            />
            <div className="flex gap-2">
              <Button onClick={handleGetSuggestions} variant="secondary">
                Get AI Suggestions
              </Button>
              <Button onClick={handleDownloadContract} variant="outline">
                Download Contract
              </Button>
            </div>
          </div>
        )}
        {suggestions.length > 0 && (
          <div>
            <h3>AI Suggestions:</h3>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContractGenerator;
