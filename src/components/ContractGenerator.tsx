
'use client';

import React, { useState,useRef } from 'react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, convertInchesToTwip, VerticalAlign, AlignmentType, UnderlineType } from "docx";
import { saveAs } from 'file-saver'
import { jsPDF } from "jspdf";
import Markdown from 'markdown-to-jsx';
import { generateContract } from '@/ai/flows/generate-contract';
import { suggestImprovements } from '@/ai/flows/suggest-improvements';
import {
  Alert, AlertDescription, AlertTitle,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { File, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
 
type FormatType = "docx" | "pdf";

const ContractGenerator: React.FC = () => {
  const contractDraftRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  const [freelancerDetails, setFreelancerDetails] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<FormatType>("docx");
  const [contractDraft, setContractDraft] = useState('');
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const {toast} = useToast();

  const handleGenerateContract = async () => {
    try {
      const contractData = await generateContract({
        freelancerDetails,
        paymentTerms,
        clientDetails,
        serviceDescription,
      });
      setIsLoading(true);
      setContractDraft(contractData.contractDraft);
      toast({
        duration: 5000,
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
    setIsLoading(false)
  };

  const handleGetSuggestions = async () => {
    try {
      const improvements = await suggestImprovements({ contractText: contractDraft });
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

  const handleDownloadContract = async () => {
    try {
    if (!contractDraft) return;

      if (downloadFormat === "docx") {
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                new Paragraph({ text: "Contract Draft", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({ children: [new TextRun(contractDraft)] }),
              ],
            },
          ],
        });
        const blob = await Packer.toBlob(doc);
        saveAs(blob, "contract.docx");
      } else if (downloadFormat === "pdf") {
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(contractDraft, 180);
        pdf.setFontSize(12);
        pdf.text(lines, 10, 10);
        pdf.save("contract.pdf");
      }
      toast({
        title: "Contract downloaded successfully!",
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

  const handleViewContract = () =>
    router.push(`/contract-draft?contract=${encodeURIComponent(contractDraft)}`);


  return (
    <Card className="w-full md:w-[90%] max-w-4xl shadow-md p-4 mx-auto">
      <CardHeader>
        <CardTitle>Contract Generator</CardTitle>
        <CardDescription>Fill in the details to generate your contract.</CardDescription>        
      </CardHeader>
      <CardContent className="grid gap-6 ">
        <div className="grid gap-2 ">
          <Label htmlFor="freelancerDetails">Freelancer Details </Label>
          <Input
            id="freelancerDetails"
            value={freelancerDetails}
            onChange={(e) => setFreelancerDetails(e.target.value)}
            placeholder="Enter freelancer details"
            className='w-full'
          />
        </div>
        <div className="grid gap-2 ">
          <Label htmlFor="clientDetails">Client Details</Label>
          <Input
            id="clientDetails"
            value={clientDetails}
            onChange={(e) => setClientDetails(e.target.value)}
            className='w-full'
            placeholder="Enter client details"
          />
        </div>
        <div className="grid gap-2 ">
          <Label htmlFor="serviceDescription">Service Description</Label>
          <Textarea
            id="serviceDescription"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            className='w-full'
            placeholder="Enter service description"
          />
        </div>
        <div className="grid gap-2 ">
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Input
            id="paymentTerms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            className='w-full'
            placeholder="Enter payment terms"
          />
        </div>
        <Button onClick={handleGenerateContract} className="bg-primary text-primary-foreground hover:bg-primary/80 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                )}
                Generate Contract
              </Button>
        {contractDraft && (
          <>
            <div className='grid gap-4'>
              <Separator />
              <div className='flex items-center justify-between'>
                <Label htmlFor="contractDraft">Contract Draft</Label>
                <div className="flex gap-2 flex-wrap ">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size='sm'>
                        <File className='mr-2 w-4 h-4' />
                        Download as {downloadFormat.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Format</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setDownloadFormat("docx")}>
                        DOCX
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDownloadFormat("pdf")}>
                        PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu >
                  <Button variant="outline" size='sm' onClick={handleViewContract}>
                      <ExternalLink className='mr-2 w-4 h-4' />
                      View Contract
                   </Button>
                </div>

              </div>
              
              <Button size='sm' onClick={handleGetSuggestions} variant="secondary" className='w-fit'>
                </Button>
               {isMobile && ( 
                  <Button size='sm'  onClick={handleViewContract} variant="secondary" className='w-fit'>
                  View Contract
                </Button>
               ) }
              
            </div>
          </>
        )}
        {suggestions.length > 0 && (
          <div className='mt-2'>
            <h3>AI Suggestions:</h3>
            <ul className='ml-4'>
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground list-disc">
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
   