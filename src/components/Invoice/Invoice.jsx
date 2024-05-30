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
        <h1 className="text-2xl font-bold mb-4">Products Invoice</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                  Category
                </th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                  Price
                </th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-gray-700">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    {product.category}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    ${product.price}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700">
                    {product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="mt-4 py-2 px-6 bg-[#3bb77e] hover:bg-[#29a56c] text-white font-semibold rounded-lg shadow-md"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
