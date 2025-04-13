 // src/components/ContractGeneratorForm.tsx
import React, { useCallback, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContractData } from '@/types';
import { Loader2 } from 'lucide-react';


interface ContractGeneratorFormProps {
  onSubmit: SubmitHandler<ContractData>;
  isLoading: boolean;
}

const ContractGeneratorForm: React.FC<ContractGeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ContractData>({
    defaultValues: {
      freelancerDetails: '',
      clientDetails: '',
      serviceDescription: '',
      paymentTerms: '',
      governingLaw: '',
    },
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name, value);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 max-w-2xl">
      <div className="grid gap-2">
        <Label htmlFor="freelancerDetails">Freelancer Details</Label>
        <Input
          id="freelancerDetails"
          {...register('freelancerDetails', { required: 'Freelancer Details is required' })}
          onChange={handleChange}
          placeholder="Enter freelancer details"
          className={`w-full ${errors.freelancerDetails ? 'border-red-500' : ''}`}
        />
        {errors.freelancerDetails && (
          <p className="text-red-500 text-sm mt-1">{errors.freelancerDetails.message}</p>
        )}

      </div>
      <div className="grid gap-2">
        <Label htmlFor="clientDetails">Client Details</Label>
        <Input
          id="clientDetails"
          {...register('clientDetails', { required: 'Client Details is required' })}
          onChange={handleChange}
          placeholder="Enter client details"
          className={`w-full ${errors.clientDetails ? 'border-red-500' : ''}`}
        />
        {errors.clientDetails && (
          <p className="text-red-500 text-sm mt-1">{errors.clientDetails.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="serviceDescription">Service Description</Label>
        <Textarea
          {...register('serviceDescription', { required: 'Service Description is required' })}
          id="serviceDescription"
          onChange={handleChange}
          className={`w-full ${errors.serviceDescription ? 'border-red-500' : ''}`}
          placeholder="Enter service description"
        />
        {errors.serviceDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.serviceDescription.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="paymentTerms">Payment Terms</Label>
        <Input
          {...register('paymentTerms', { required: 'Payment Terms is required' })}
          id="paymentTerms"
          onChange={handleChange}
          className={`w-full ${errors.paymentTerms ? 'border-red-500' : ''}`}
          placeholder="Enter payment terms"
        />
        {errors.paymentTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.paymentTerms.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="governingLaw">Governing Law</Label>
        <Input
          {...register('governingLaw', { required: 'Governing Law is required' })}
          id="governingLaw"
          placeholder="Enter governing law"
          className={`w-full ${errors.governingLaw ? 'border-red-500' : ''}`}
        />
        {errors.governingLaw && (
          <p className="text-red-500 text-sm mt-1">{errors.governingLaw.message}</p>
        )}
      </div>
      <Button
        type="submit"
        variant='default'
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
        Generate Contract
      </Button>
    </form>
  );
};

export default ContractGeneratorForm;