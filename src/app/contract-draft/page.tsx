"use client";

import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { EditorDisplay} from './EditorDisplay';

// AI suggestions (assuming this is the correct path)
import { suggestImprovements } from '@/ai/flows/suggest-improvements';
// Redux state (assuming this is the correct path)
import { RootState } from '@/store';
// Shadcn UI components (assuming these paths are correct)
// Custom hook (assuming this path is correct)
import { useToast } from '@/hooks/use-toast';
// Tiptap editor
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Loader2 } from 'lucide-react';
import ContractPageHeader from './ContractPageHeader';
import EditorToolbar from './EditorToolbar';
import SuggestionsDisplay from './SuggestionsDisplay';
import { ActionButtons } from './ActionButtons';


const ContractDraftPage: React.FC = () => {
  const router = useRouter();
  const contractData = useSelector((state: RootState) => state.contract);
  const { contractDraft } = contractData;

  // State variables remain in the parent
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
      if (!contractDraft) {
          router.push('/contract-generator');
      }
  }, [contractDraft, router]);

    const onApplySuggestion = useCallback((suggestion: string) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter((s) => s !== suggestion)
    );
  }, []);



    // State variables remain in the parent
  const [downloadFormat, setDownloadFormat] = useState<'docx' | 'pdf'>('docx');
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [suggestionsError, setSuggestionsError] = useState<boolean>(false); // Track if suggestion loading failed
  const { toast } = useToast();

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: contractDraft || '<p>Start writing your contract...</p>',
    editable: true,
  });

  // Effect to update editor content if contractDraft changes from Redux
  useEffect(() => {
    if (editor && contractDraft && editor.getHTML() !== contractDraft) {
      editor.commands.setContent(contractDraft, false);
    }
  }, [contractDraft, editor]);



  const handleGetSuggestions = useCallback(async () => {
    const currentContent = editor?.getText();
    if (!currentContent?.trim()) {
       toast({ title: 'Empty Content', description: 'Cannot generate suggestions for an empty contract.', variant: 'destructive' });
       return;
    }
    setIsGettingSuggestions(true);
    setErrorMessage(null);
    setSuggestionsError(false); // Reset suggestion error state
    setSuggestions([]); // Clear previous suggestions
    try {
      const improvements = await suggestImprovements({ contractText: currentContent });
      setSuggestions(improvements.suggestions);
      toast({ title: 'AI Suggestions Generated!', description: 'Suggestions have been successfully generated.' });
    } catch (error) {
      console.error('Error getting suggestions:', error);
      const errorMsg = 'Failed to generate suggestions. Please try again.';
      setErrorMessage(errorMsg); // Show general error
      setSuggestionsError(true); // Set suggestion specific error state
      toast({ title: 'Error', description: errorMsg, variant: 'destructive' });
    } finally {
      setIsGettingSuggestions(false);
    }
  }, [editor, toast]);

  const handleCopyToClipboard = useCallback(() => {
    if (!editor) return;
    const text = editor.getText();
    if (!text.trim()) {
      toast({ title: 'Nothing to copy', description: 'The editor is empty.', variant: 'destructive'});
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      toast ({ title: 'Contract Copied', description: 'Contract text copied to clipboard.' });
    }).catch((error) => {
      console.error('Clipboard copy error:', error);
      toast({ title: 'Copy Failed', description: 'Could not copy contract text to clipboard.', variant: 'destructive' });
    });
  }, [editor, toast]);

  const handleDownloadContract = useCallback(async () => {
    if (!editor) return;
    const text = editor.getText();
    if (!text.trim()) {
      toast({ title: 'Cannot Download Empty Contract', description: 'Please add content to the contract before downloading.', variant: 'destructive'});
      return;
    }
    setIsDownloading(true);
    setErrorMessage(null);
    try {
      let blob: Blob | undefined;
      let fileName: string;
      if (downloadFormat === 'pdf') {
        const { default: jsPDF } = await import('jspdf');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const margin = 15, fontSize = 11, lineHeight = 6;
        pdf.setFontSize(fontSize);
        const availableWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const textLines = pdf.splitTextToSize(text, availableWidth);
        let y = margin;
        textLines.forEach((line: string) => {
          if (y > pdf.internal.pageSize.getHeight() - margin) { pdf.addPage(); y = margin; }
          pdf.text(line, margin, y); y += lineHeight;
        });
        blob = pdf.output('blob');
        fileName = 'contract.pdf';
      } else {
        const { Document, Packer, TextRun, Paragraph, HeadingLevel } = await import('docx');
        const paragraphs = text.split('\n').map(line => new Paragraph({ children: [new TextRun(line)], spacing: { after: 100 } }));
        const doc = new Document({ sections: [{ properties: {}, children: [ new Paragraph({ text: 'Contract Draft', heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }), ...paragraphs ] }] });
        blob = await Packer.toBlob(doc);
        fileName = 'contract.docx';
      }
      saveAs(blob, fileName);
      toast({ title: 'Contract Downloaded', description: `Contract downloaded successfully as ${fileName}.` });
    } catch (error) {
      console.error('Error generating or downloading contract:', error);
      const errorMsg = 'Failed to download the contract. Please check console for details.';
      setErrorMessage(errorMsg);
      toast({ title: 'Download Failed', description: errorMsg, variant: 'destructive' });
    } finally {
      setIsDownloading(false);
    }
  },[editor, downloadFormat, toast]);


  if (!editor) {
    return <div className="container mx-auto p-6 text-center"><Loader2 className="animate-spin h-8 w-8 inline-block" /> Loading Editor...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Render Child Components */}
      <ContractPageHeader title="Contract Draft" onBack={() => router.back()} />
      <EditorToolbar editor={editor} onGetSuggestions={handleGetSuggestions} isGettingSuggestions={isGettingSuggestions} />
      <EditorDisplay editor={editor}/>
      <ActionButtons
        onCopy={handleCopyToClipboard}
        onDownload={handleDownloadContract}
        isDownloading={isDownloading}
        downloadFormat={downloadFormat}
        onFormatChange={setDownloadFormat}
      />

      {/* Display General Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
          {errorMessage}
        </div>
       )}

      <SuggestionsDisplay
        suggestions={suggestions}
        isGettingSuggestions={isGettingSuggestions}
        isLoadingError={suggestionsError} // Pass down the suggestion error state
        onApplySuggestion={onApplySuggestion}
      />
    </div>
  );
};

export default ContractDraftPage;
