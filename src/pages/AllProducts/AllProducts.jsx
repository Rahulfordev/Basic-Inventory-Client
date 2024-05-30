import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import axios from "axios";
import Invoice from "../../components/Invoice/Invoice";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "Automobiles",
    price: "",
    quantity: "",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;

      if (form.image && form.image instanceof File) {
        const formData = new FormData();
        formData.append("file", form.image);

        const uploadResponse = await axios.post(
          "http://localhost:3001/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadResponse.data.imageUrl;
      }

      const productData = {
        ...form,
        image: imageUrl,
      };

      if (editProductId) {
        await axios.put(
          `http://localhost:3001/api/products/${editProductId}`,
          productData
        );
      } else {
        await axios.post("http://localhost:3001/api/products", productData);
      }
      fetchProducts();
      setForm({
        name: "",
        image: "",
        category: "Automobiles",
        price: "",
        quantity: "",
      });
      setEditProductId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditProductId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          className="px-4 py-2 text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
          onClick={() => setShowModal(true)}
        >
          Create new
        </button>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg hover:shadow-md duration-200 transition overflow-hidden"
            >
              <div className="h-56">
                <img
                  src={`http://localhost:3001${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-base font-semibold text-gray-700 truncate">
                  {product.name}
                </h4>
                <p className="text-green-600 font-medium">${product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
                    onClick={() => handleEdit(product)}
                  >
                    <MdEdit />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#3bb77e] hover:text-white hover:border-[#3bb77e] transition"
                    onClick={() => handleDelete(product.id)}
                  >
                    <MdDelete />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <div className="mb-3">
              <button
                className="absolute top-[2px] right-1  pb-4 text-gray-700"
                onClick={() => setShowModal(false)}
              >
                <IoIosClose className="text-[30px]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Automobiles">Automobiles</option>
                <option value="Home items">Home items</option>
                <option value="Electronics">Electronics</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Sport items">Sport items</option>
                <option value="Baby and Toys">Baby and Toys</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full p-2 text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
              >
                {editProductId ? "Update" : "Add"} Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
