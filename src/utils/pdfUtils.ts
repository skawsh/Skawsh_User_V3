
import { Order } from '@/types/order';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Extended jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateInvoicePDF = (order: Order): void => {
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add header
  doc.setFontSize(20);
  doc.text('INVOICE', pageWidth / 2, 20, { align: 'center' });
  
  // Add order info
  doc.setFontSize(10);
  doc.text(`Invoice #: INV-${order.id.substring(0, 8)}`, 14, 40);
  doc.text(`Date: ${new Date(order.updatedAt).toLocaleDateString()}`, 14, 45);
  doc.text(`Order #: ORD-${order.id.substring(0, 4)}`, 14, 50);
  
  // Add customer section
  doc.setFontSize(12);
  doc.text('Bill To:', 14, 60);
  doc.setFontSize(10);
  doc.text('Customer Name: User', 14, 65);
  doc.text('Phone: 8197733xxxx', 14, 70);
  doc.text('Address: Home(306, Prashant Hills, Hyd)', 14, 75);
  
  // Add service provider section
  doc.setFontSize(12);
  doc.text('Service Provider:', pageWidth - 90, 60);
  doc.setFontSize(10);
  doc.text(`${order.studioName}`, pageWidth - 90, 65);
  doc.text('Khajaguda, Rai Durgam, HYD', pageWidth - 90, 70);
  
  // Add services table
  const tableColumn = ['Service', 'Quantity', 'Rate', 'Amount'];
  const tableRows: any[] = [];
  
  // Add service items to table
  order.services.forEach(service => {
    const serviceData = [
      service.name,
      service.quantity,
      `₹${service.price}`,
      `₹${service.price * service.quantity}`
    ];
    tableRows.push(serviceData);
  });
  
  // Generate the table
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 85,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 133, 244] }
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Add summary
  doc.text('Subtotal:', pageWidth - 60, finalY);
  doc.text(`₹${order.totalAmount}`, pageWidth - 25, finalY, { align: 'right' });
  
  doc.text('Delivery Charges:', pageWidth - 60, finalY + 5);
  doc.text('₹50', pageWidth - 25, finalY + 5, { align: 'right' });
  
  // Calculate GST (18%)
  const gst = Math.round(order.totalAmount * 0.18);
  doc.text('GST (18%):', pageWidth - 60, finalY + 10);
  doc.text(`₹${gst}`, pageWidth - 25, finalY + 10, { align: 'right' });
  
  // Calculate grand total
  const grandTotal = order.totalAmount + 50 + gst;
  doc.setFontSize(12);
  doc.text('Grand Total:', pageWidth - 60, finalY + 20);
  doc.text(`₹${grandTotal}`, pageWidth - 25, finalY + 20, { align: 'right' });
  
  // Add footer
  doc.setFontSize(9);
  doc.text('Thank you for your business!', pageWidth / 2, finalY + 35, { align: 'center' });
  doc.text('For any queries, please contact support.', pageWidth / 2, finalY + 40, { align: 'center' });
  
  // Use a more reliable method for PDF blob creation and download
  try {
    // Generate PDF blob data
    const pdfBlob = doc.output('blob');
    
    // Create URL for the blob
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    // Create a hidden link element
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';
    downloadLink.href = blobUrl;
    downloadLink.download = `Invoice-${order.id.substring(0, 8)}.pdf`;
    
    // Append to document, trigger click and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Clean up resources with a slight delay to ensure download starts
    setTimeout(() => {
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);
    }, 200);
  } catch (error) {
    console.error('Error creating PDF download:', error);
    throw new Error('Failed to generate PDF');
  }
};
