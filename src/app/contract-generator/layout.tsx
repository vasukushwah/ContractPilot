import RootLayout from '../layout';

export const metadata = {
  title: 'Contract Generator - ContractPilot',
  description: 'Generate your custom contracts quickly and easily with ContractPilot.',
};

export default function ContractGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      {children}
    </RootLayout>
  );
}