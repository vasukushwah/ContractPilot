import React from 'react';

interface ContractPageHeaderProps {
  title: string;
  onBack: () => void;
}

 const ContractPageHeader: React.FC<ContractPageHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button onClick={onBack} className="px-4 py-2 text-white rounded">
        Back to Generator
      </button>
    </div>
  );
};
export default ContractPageHeader