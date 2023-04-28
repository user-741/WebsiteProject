function generateInvoice() {
    // Get form data
    const companyName = document.getElementById('company-name').value;
    const quantity = document.getElementById('quantity').value || 0;
    const description = document.getElementById('description').value;
    const unitPrice = document.getElementById('unit-price').value || 0;
    const invoiceNumber = document.getElementById('invoice-number').value || '0000';
    const invoiceDate = document.getElementById('invoice-date').value;
  
    // Calculate line total
    const lineTotal = quantity * unitPrice;
  
    // Generate invoice HTML
    const invoiceHTML = `
      <h1>TAX INVOICE</h1>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${quantity}</td>
            <td>${description}</td>
            <td>$${unitPrice.toFixed(2)}</td>
            <td>$${lineTotal.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td colspan="3">Total:</td>
            <td>$${lineTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    `;
  
    // Display invoice HTML
    const invoiceWindow = window.open('', 'Invoice');
    invoiceWindow.document.write(invoiceHTML);
    
    // Add download and share buttons to invoice window
    const downloadButton = `<button id="download-pdf">Download PDF</button>`;
    const shareButton = `<button id="share-invoice">Share</button>`;
    invoiceWindow.document.write(downloadButton + shareButton);
  
    // Add event listeners to download and share buttons
    const downloadPDFButton = invoiceWindow.document.getElementById('download-pdf');
    downloadPDFButton.addEventListener('click', function() {
      downloadPDF(invoiceHTML);
    });
  
    const shareInvoiceButton = invoiceWindow.document.getElementById('share-invoice');
    shareInvoiceButton.addEventListener('click', function() {
      shareInvoice(invoiceHTML);
    });
  }
  
  function downloadPDF(invoiceHTML) {
    // Convert HTML to PDF using a PDF generation library
    // Here we're using jsPDF, which you'll need to include in your HTML file:
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    const pdfDoc = new jsPDF();
    pdfDoc.fromHTML(invoiceHTML);
    pdfDoc.save('invoice.pdf');
  }
  
  function shareInvoice(invoiceHTML) {
    // Open a new window with the invoice HTML
    const shareWindow = window.open('', 'Share', 'width=600,height=400');
    shareWindow.document.write(invoiceHTML);
  }