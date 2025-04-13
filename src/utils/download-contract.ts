// src/utils/download-contract.ts

import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import { toast } from "@/hooks/use-toast"; // Assuming useToast is in this path
// import autoTable from 'jspdf-autotable';


type FormatType = "docx" | "pdf";

export const handleDownloadContract = async (contractDraft: string, downloadFormat: FormatType) => {
  try {
    if (!contractDraft) {
      toast({
        title: "Error",
        description: "No contract draft available to download.",
        variant: "destructive",
      });
      return;
    }

    if (downloadFormat === "docx") {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({ text: "Contract Draft", heading: HeadingLevel.HEADING_1 }),
              new Paragraph({ children: [new TextRun(contractDraft)] }),
            ],
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "contract.docx");
    } else if (downloadFormat === "pdf") {
      const pdf = new jsPDF();
      pdf.setFontSize(12);

      // Improved text rendering with options
      const textOptions = {
        maxWidth: 180, // A4 width minus margins
        charSpace: 0.1,   // Adjust character spacing
        lineHeightFactor: 1.15, // Adjust line height
      };

      // Use autoTable for structured formatting
      // autoTable(pdf, {
      //   body: [[contractDraft]],
      //   margin: { top: 10, left: 10, right: 10, bottom: 10 },
      //   styles: {
      //     overflow: 'linebreak',
      //     fontSize: 10,
      //   },
      // });
      pdf.text(contractDraft, 10, 10, textOptions);
      pdf.save("contract.pdf");
    }
    toast({
      title: "Contract downloaded successfully!",
    });
  } catch (error) {
    console.error("Error generating contract:", error);
    toast({
      title: "Error",
      description: `Failed to generate contract for download. Error: ${error.message}`,
      variant: "destructive",
    });
  }
};
