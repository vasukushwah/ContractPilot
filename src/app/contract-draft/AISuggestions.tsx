// src/components/AISuggestions.tsx
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateContractDraft } from '@/features/contract/contractSlice';

interface AISuggestionsProps {
    suggestions: string[];
    onApplySuggestion: (suggestion: string) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions, onApplySuggestion }) => {
    const dispatch = useDispatch();
    const contractDraft = useSelector((state: RootState) => state.contract.contractDraft);
    
    const handleApplySuggestion = useCallback((suggestion: string) => {
        console.log(`Suggestion applied: ${suggestion}`);
        if(contractDraft){
          const newContractText = contractDraft + "\n" + suggestion;
          dispatch(updateContractDraft(newContractText));
          onApplySuggestion(suggestion);
        }
    }, [dispatch, contractDraft]);

  return (
    <section className="mt-8" aria-labelledby="ai-suggestions-heading">
      <h2 className="mb-4 font-semibold" id="ai-suggestions-heading">
        AI Suggestions:
      </h2>
      <ul className="grid gap-4 ">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="bg-gray-100 p-4 rounded-md shadow-sm flex items-center justify-between"
          >
            <p className="text-sm text-gray-800 ">{suggestion}</p>
            <Button onClick={() => handleApplySuggestion(suggestion)}>
              Apply
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AISuggestions;