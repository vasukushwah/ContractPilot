
'use client';

import React, { useState, useCallback } from 'react';
import { generateContract } from '@/ai/flows/generate-contract';
import ContractGeneratorForm from './ContractGeneratorForm';
import { handleDownloadContract } from '@/utils/download-contract';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateContractDraft } from '@/features/contract/contractSlice';
import { RootState } from '@/store';
import { useIsMobile } from '@/hooks/use-mobile';
import { Loader2 } from 'lucide-react';

type FormatType = "docx" | "pdf";

const ContractGenerator: React.FC = ({}) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [downloadFormat] = useState<FormatType>("docx");
  const router = useRouter()

  const { toast } = useToast();
  
  const handleGenerateContract = async (data) => {  
     try {
      setIsLoading(true);

      const contractData = await generateContract({ 
        freelancerDetails: data.freelancerDetails,
        paymentTerms: data.paymentTerms,
        clientDetails: data.clientDetails,
        serviceDescription: data.serviceDescription,
        governingLaw: data.governingLaw,


      });

      dispatch(updateContractDraft(contractData.contractDraft));

      toast({
        duration: 5000,
        title: "Contract generated successfully! Redirecting to contract draft...",
      });
      router.push(`/contract-draft`);
    } catch (error) {
      console.error("Error generating contract:", error);

    } finally { setIsLoading(false); }
  };

  const { contractDraft } = useSelector((state: RootState) => state.contract);

  const handleDownload = async () => {
    try{
      await handleDownloadContract(contractDraft, downloadFormat, toast);
      toast({
        title: "Contract downloaded successfully!",
      })
    } catch (error) { }
  };  return (
    <Card className="w-full md:w-[90%] max-w-4xl shadow-md p-4 mx-auto">
      <CardHeader>
        <CardTitle>Contract Generator</CardTitle>
        <CardDescription>Fill in the details to generate your contract.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
          <ContractGeneratorForm onSubmit={handleGenerateContract} isLoading={isLoading}  />
        {contractDraft && (
          
          <div className='grid gap-4'>
            <Separator />
            <div className='flex items-center justify-between'>
              <div className="flex gap-2 flex-wrap ">
                <Button variant="outline" size="sm" onClick={handleDownload}>Download Contract</Button>
              </div>
            </div>


            {isMobile && (
              <Button size='sm' onClick={handleViewContract} variant="secondary" className='w-fit'>
                View Contract
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>

  );
};

export default ContractGenerator;

