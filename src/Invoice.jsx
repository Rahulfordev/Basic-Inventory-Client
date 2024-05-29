import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ products }) => {
  const invoiceRef = useRef();

  const generatePDF = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("invoice.pdf");
  };

  return (
    <div>
      <div ref={invoiceRef}>
        <h1>Product Invoice</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td data-label="Name">{product.name}</td>
                <td data-label="Category">{product.category}</td>
                <td data-label="Price">${product.price}</td>
                <td data-label="Quantity">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default Invoice;
