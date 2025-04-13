
import RootLayout from '../layout';
import ContractGenerator from '@/components/ContractGenerator';

export default function Page() {
  return (
    <RootLayout>
      <div className="flex justify-center items-center h-screen bg-secondary">
        <ContractGenerator />
      </div>
    </RootLayout>
  );
}
