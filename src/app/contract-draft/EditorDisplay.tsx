// ContractDraftPageComponents.tsx

import React from 'react';
import { Editor, EditorContent } from '@tiptap/react';

interface EditorDisplayProps {
  editor: Editor | null;
}
const EditorDisplay: React.FC<EditorDisplayProps> = ({ editor }) => (
  <div className="w-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-6 border border-gray-300 bg-white rounded-lg shadow-sm min-h-[60vh] mb-6 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
    <EditorContent editor={editor} />
  </div>
);



export { EditorDisplay };