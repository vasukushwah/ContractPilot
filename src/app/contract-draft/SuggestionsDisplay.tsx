import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const LazyAiSuggestions = lazy(() => import('./AISuggestions'));

interface SuggestionsDisplayProps {
  suggestions: string[];
  isGettingSuggestions: boolean;
  onApplySuggestion: (suggestion: string) => void;
  isLoadingError: boolean;
}

const SuggestionsDisplay: React.FC<SuggestionsDisplayProps> = ({ suggestions, isGettingSuggestions, isLoadingError, onApplySuggestion }) => (
  <>
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">AI Suggestions</h2>
    <Suspense fallback={<div className="mt-4 text-gray-500"><Loader2 className="animate-spin h-5 w-5 inline-block mr-2" />Loading Suggestions...</div>}>
      {!isGettingSuggestions && suggestions.length > 0 && !isLoadingError && (
        <LazyAiSuggestions suggestions={suggestions} onApplySuggestion={onApplySuggestion}/>
      )}
      {isGettingSuggestions && (
        <div className="p-4 bg-gray-100 border border-gray-200 rounded-md text-gray-500 text-sm">
          Generating suggestions...
        </div>
      )}
      {!isGettingSuggestions && suggestions.length === 0 && !isLoadingError && (
        <div className="p-4 bg-gray-100 border border-gray-200 rounded-md text-gray-500 text-sm">
          Click "Get AI Suggestions" to see improvement ideas here.
        </div>
      )}
      {!isGettingSuggestions && isLoadingError && (
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-700 text-sm">
          Could not load suggestions. Please try again.
        </div>
      )}
    </Suspense>
  </>
);

export default SuggestionsDisplay;