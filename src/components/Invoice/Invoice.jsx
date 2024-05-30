import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Invoice = ({ products }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Products Invoice", 20, 10);

    const columns = [
      { header: "ID", dataKey: "id" },
      { header: "Name", dataKey: "name" },
      { header: "Category", dataKey: "category" },
      { header: "Price", dataKey: "price" },
      { header: "Quantity", dataKey: "quantity" },
    ];

    const tableData = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    }));

    console.log("Columns: ", columns);
    console.log("Table Data: ", tableData);

    doc.autoTable({
      columns: columns,
      body: tableData,
      startY: 20,
    });

    doc.save("products-invoice.pdf");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Products Invoice</h1>
          <button
            onClick={generatePDF}
            className="py-2 px-6 bg-[#3bb77e] hover:bg-[#29a56c] text-white font-semibold rounded-lg shadow-md text-[15px]"
          >
            Download PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Category
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Price
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 text-sm">
                  <td className="py-2 px-4 border-b border-r text-gray-700">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-gray-700">
                    {product.category}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-gray-700">
                    ${product.price}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-gray-700">
                    {product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
