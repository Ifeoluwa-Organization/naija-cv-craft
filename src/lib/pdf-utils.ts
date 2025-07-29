import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generatePDF(type: 'cv' | 'cover-letter' | 'both', filename: string) {
  try {
    if (type === 'both') {
      // Generate combined PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add CV
      const cvElement = document.getElementById('cv-preview');
      if (cvElement) {
        const cvCanvas = await html2canvas(cvElement, { scale: 2 });
        const cvImgData = cvCanvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = (cvCanvas.height * imgWidth) / cvCanvas.width;
        pdf.addImage(cvImgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      // Add new page for cover letter
      pdf.addPage();
      const clElement = document.getElementById('cover-letter-preview');
      if (clElement) {
        const clCanvas = await html2canvas(clElement, { scale: 2 });
        const clImgData = clCanvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = (clCanvas.height * imgWidth) / clCanvas.width;
        pdf.addImage(clImgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      pdf.save(filename);
    } else {
      // Generate single document PDF
      const elementId = type === 'cv' ? 'cv-preview' : 'cover-letter-preview';
      const element = document.getElementById(elementId);
      
      if (!element) {
        throw new Error('Element not found');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}