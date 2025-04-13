import React from 'react';
import { Editor } from '@tiptap/react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Lightbulb, Loader2 } from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor | null;
  onGetSuggestions: () => void;
  isGettingSuggestions: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, onGetSuggestions, isGettingSuggestions }) => {
  if (!editor) return null;

  interface ToolbarButtonProps extends ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
    label: string;
  }

  const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, disabled, isActive, label, children, ...props }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={isActive ? 'bg-gray-300' : ''}
      {...props}
    >
      {children}
    </Button>
  );

  return (
    <nav className="mb-4 p-2 bg-gray-100 rounded-md border border-gray-200 flex flex-wrap items-center gap-2" aria-label="Editor Formatting Controls">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()} isActive={editor.isActive('bold')} label="Bold">
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().toggleItalic()} isActive={editor.isActive('italic')} label="Italic">
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().toggleBulletList()} isActive={editor.isActive('bulletList')} label="Unordered List">
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} disabled={!editor.can().toggleOrderedList()} isActive={editor.isActive('orderedList')} label="Ordered List">
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <Button size="sm" onClick={onGetSuggestions} variant="outline" className="ml-auto" disabled={isGettingSuggestions} aria-label="Get AI Suggestions">
        {isGettingSuggestions ? (
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
        ) : (
          <Lightbulb className="h-4 w-4 mr-2" />
        )}
        Get AI Suggestions
      </Button>
    </nav>
  );
};

export default EditorToolbar ;