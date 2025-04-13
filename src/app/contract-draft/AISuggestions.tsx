// src/components/AISuggestions.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

interface AISuggestionsProps {
  suggestions: string[];
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions }) => {
  const handleApplySuggestion = (suggestion: string) => {
    console.log(`Suggestion applied: ${suggestion}`);
  };

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
            <Button onClick={() => handleApplySuggestion(suggestion)} className="bg-blue-500 text-white rounded-md ">
              Apply
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AISuggestions;