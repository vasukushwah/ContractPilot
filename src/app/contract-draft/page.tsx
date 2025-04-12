'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
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
import { Bold, Copy, Download, Italic, List, ListOrdered } from 'lucide-react';

const ContractDraftPage: React.FC = () => {
  const searchParams = useSearchParams();
  const contractDraft = searchParams.get('contract') || '';
  const [downloadFormat, setDownloadFormat] = useState<'docx' | 'pdf'>('docx');
  const editor = useEditor({
    extensions: [StarterKit],
    content: contractDraft,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('html : ',html)
    },
  });

  const {toast} = useToast();

  useEffect(() => {
    if (!contractDraft) {
      // You might want to handle the case where there's no contract draft,
      // e.g., redirect the user back to the generator or show an error message.
      console.warn('No contract draft found in URL parameters.');
    }
  }, [contractDraft]);

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
    if (!editor) return;
    const text = editor.getText()

    try {
      let blob: Blob | undefined;
      let fileName: string;

      if (downloadFormat === 'pdf') {
        const pdf = new jsPDF();
        pdf.text(contractDraft, 10, 10); // Basic text rendering. Consider using more advanced features for better formatting.
        blob = pdf.output('blob');
        fileName = 'contract.pdf';
      } else {
        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({ text: "Contract Draft", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({
                  children: [new TextRun(text)],
                }),
              
            ],
          }],
        });

        blob = await Packer.toBlob(doc)
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
    }
  },[editor, downloadFormat,toast]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contract Draft</h1>
       {/* Editor Controls */}
       {editor && (
          <div className="mb-4 flex flex-wrap gap-2">
            <Button onClick={() => editor.chain().focus().toggleBold().run()}>
              <Bold className='h-4 w-4'/>
            </Button>
            <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
              <Italic className='h-4 w-4'/>
            </Button>
            <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List className='h-4 w-4'/>
            </Button>
            <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>
             <List className='h-4 w-4'/>

            </Button>
            <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered />
            </Button>
          </div>
        )}
      <div className="w-full max-w-210mm min-h-297mm p-4 border border-gray-300 bg-white rounded-lg shadow-md min-h-[500px]">
         <EditorContent editor={editor} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={handleCopyToClipboard} className='flex gap-2 items-center'>
          <Copy className='h-4 w-4' /> Copy to Clipboard
        </Button>
        <Button onClick={handleDownloadContract} className='flex gap-2 items-center'>
          <Download className='h-4 w-4'/> Download Contract
        </Button>
        <Select value={downloadFormat} onValueChange={setDownloadFormat}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="docx">DOCX</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ContractDraftPage;
