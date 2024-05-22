import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

async function generatePDF(contentRef) {
  try {
    const canvas = await html2canvas(contentRef, { scale: 2 });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    return pdf.output('blob'); // Return the PDF blob
  } catch (error) {
    console.error('PDF generation error:', error);
    return null; // Return null in case of an error
  }
}

export default generatePDF;
