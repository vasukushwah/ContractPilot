import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue ,SelectItem} from "@/components/ui/select";
import { Copy, Download, Loader2 } from "lucide-react";

interface ActionButtonsProps {
    onCopy: () => void;
    onDownload: () => void;
    isDownloading: boolean;
    downloadFormat: 'docx' | 'pdf';
    onFormatChange: (format: 'docx' | 'pdf') => void;
  }
  
  const ActionButtons: React.FC<ActionButtonsProps> = ({ onCopy, onDownload, isDownloading, downloadFormat, onFormatChange }) => (
    <div className="mb-8 flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200">
      <Button onClick={onCopy} variant="outline" size="sm" aria-label="Copy contract to clipboard">
        <Copy className='h-4 w-4 mr-2' /> Copy Text
      </Button>
      <div className="flex items-center gap-2">
        <Button onClick={onDownload} size="sm" disabled={isDownloading} aria-label="Download contract">
          {isDownloading ? (
             <Loader2 className="animate-spin w-4 h-4 mr-2" />
          ) : (
             <Download className='h-4 w-4 mr-2' />
          )}
          Download
        </Button>
        <Select value={downloadFormat} onValueChange={onFormatChange} aria-label="Select download format">
          <SelectTrigger className="w-[100px] h-9 text-sm">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="docx">DOCX</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  export {ActionButtons}