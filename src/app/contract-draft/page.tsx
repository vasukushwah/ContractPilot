'use client';

import React, { useState, useCallback, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { Loader2, Bold, Copy, Download, Italic, List, ListOrdered, Lightbulb, Check } from 'lucide-react';

import { suggestImprovements } from '@/ai/flows/suggest-improvements';
import {RootState} from '@/store';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const LazyDocx = lazy(() => import('docx'));
const LazyJsPDF = lazy(() => import('jspdf'));
const LazyAiSuggestions = lazy(() => import('./AISuggestions'));
interface LazyComponents {
  Document: any;
  Packer: any;
}
const ContractDraftPage: React.FC = () => {
  const router = useRouter();
  const contractData = useSelector((state: RootState) => state.contract);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);

  
  const {contractDraft} = contractData
  const [downloadFormat, setDownloadFormat] = useState<'docx' | 'pdf'>('docx');
  const [lazyComponents, setLazyComponents] = useState<LazyComponents | null>(null);
  const {toast} = useToast();

  const handleGetSuggestions = useCallback(async () => {
    if (!contractDraft) return;
    setIsGettingSuggestions(true);
    try {
      const improvements = await suggestImprovements({ contractText: contractDraft });
      setSuggestions(improvements.suggestions);
      toast({
        title: 'AI Suggestions generated successfully!',
      });
    } catch (error) {
      console.error('Error getting suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate suggestions. Please try again.',
        variant: 'destructive',
      });
      setSuggestionsError('Failed to fetch AI suggestions. Please try again.');
      setErrorMessage('Failed to generate suggestions. Please try again.');
    } finally {
      setIsGettingSuggestions(false);
    }
  }, [contractDraft, toast]);

    const editor = useEditor({
      extensions: [StarterKit],
      content: contractDraft,
      editable: true,

      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        console.log('html : ', html);
      },
    }
  );



  const handleCopyToClipboard = useCallback(() => {
    const text = editor?.getText()
    navigator.clipboard.writeText(text).then(() => {
      toast ({
        title: 'Contract copied',
        description: 'Contract text copied to clipboard.',
      });
    }).catch((error) => {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy contract text.',
        variant: 'destructive',
      });
    });
  }, [editor, toast]);

  const handleDownloadContract = useCallback(async () => {
    setIsDownloading(true);
    if (!editor) return;
    const text = editor.getText();

    let Document, Packer, TextRun, HeadingLevel;
    try {
      let blob: Blob | undefined;
      let fileName: string;


      if (downloadFormat === 'pdf') {        
        const pdf = new LazyJsPDF({          
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        // Set document margins
        const margin = 10;

        // Set font size and line height
        const fontSize = 12;
        pdf.setFontSize(fontSize);
        const lineHeight = 7;

        // Calculate the available width for the text
        const availableWidth = pdf.internal.pageSize.getWidth() - 2 * margin;

        // Split the text into lines that fit within the available width
        const textLines = pdf.splitTextToSize(text, availableWidth);

        // Calculate the starting Y position for the text
        let y = margin;

        // Add each line of text to the PDF
        textLines.forEach((line: string) => {
          if (y > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin, y);
          y += lineHeight;
        });

        blob = pdf.output('blob');
        fileName = 'contract.pdf';
      } else {
       
        ({ Document, Packer, TextRun, HeadingLevel } = await import('docx').then((module) => ({
          Document: module.Document,
          Packer: module.Packer,
          TextRun: module.TextRun,
          HeadingLevel: module.HeadingLevel
        })));
        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({ text: 'Contract Draft', heading: HeadingLevel.HEADING_1 }),
                new Paragraph({
                  children: [new TextRun(text)],
                }),
              
            ],
          }],
        });

        blob = await Packer.toBlob(doc);
        fileName = 'contract.docx';
      }

      saveAs(blob, fileName);
      toast({
        title: 'Contract downloaded',
        description: `Contract downloaded successfully as ${fileName}.`,
      });
    } catch (error) {
      console.error('Error generating or downloading contract:', error);
      toast({
        title: 'Download failed',
        description: 'Failed to generate or download contract. Please try again.',
        variant: 'destructive',
      });
      setDownloadError('Failed to download the contract. Please try again.');
      setErrorMessage('Failed to download contract. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  },[editor, downloadFormat,toast]);

  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <div className="container mx-auto p-6">
      {/* Title and Back Button */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" aria-level={1} role="heading">Contract Draft</h1>
        <Button variant="secondary" size="sm" onClick={() => router.back()} aria-label="Back to Contract Generator">Back to Generator</Button>
      </header>

       {/* Editor Controls */}
        {editor && (
          <nav className="mb-6 flex flex-wrap items-center gap-2" aria-label="Editor Formatting Controls">
            <Button size="sm" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold">
              <Bold className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic">
              <Italic className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="Unordered List">
              <List className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label="Ordered List">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </nav>
        )}
      {/* Get AI Suggestions */}
      <Button size="sm" onClick={handleGetSuggestions} variant="secondary" className="w-fit mb-6" disabled={isGettingSuggestions} aria-label="Get AI Suggestions">
        {isGettingSuggestions && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
        <Lightbulb className="h-4 w-4 mr-2" />
        Get AI Suggestions
      </Button>

      {/* Display Suggestions Error */}
      {suggestionsError && <div className="text-red-500 text-sm mt-2">{suggestionsError}</div>}

      <div className="w-full max-w-210mm min-h-297mm p-4 border border-gray-300 bg-white rounded-lg shadow-md min-h-[500px] mb-8">
        <EditorContent editor={editor} />
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Button onClick={handleCopyToClipboard} className='flex gap-2 items-center' aria-label="Copy contract to clipboard">
          <Copy className='h-4 w-4' /> Copy to Clipboard
        </Button>
        <Button onClick={handleDownloadContract} className='flex gap-2 items-center' disabled={isDownloading} aria-label="Download contract">
          {isDownloading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
          <Download className='h-4 w-4' /> Download Contract
        </Button>
        <Select value={downloadFormat} onValueChange={setDownloadFormat} aria-label="Select download format">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {/* Display Download Error */}
            <SelectItem value="docx">DOCX</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>
        
      {/* AI Suggestions */}
      <Suspense fallback={<div className="mt-4">Loading...</div>}>
        {suggestions.length > 0 && (
          <LazyAiSuggestions suggestions={suggestions} />

        )}
      </Suspense>
        {/* Display Error Message */}
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default ContractDraftPage;
