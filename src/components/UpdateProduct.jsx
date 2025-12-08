import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function UpdateProduct() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const product = state?.product;
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-red-600 font-semibold">
                No product data. Please open from product page.
            </div>
        );
    }

    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        category: product.category,
        releaseDate: product.releaseDate,
        available: product.available,
        quantity: product.quantity
    });

    const [preview, setPreview] = useState(product.imageUrl);
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append(
            "product",
            new Blob([JSON.stringify(formData)], { type: "application/json" })
        );

        if (image) {
            form.append("imageFile", image);
        }

        try {
            await axios.put(
                import.meta.env.VITE_API_URL + `/product/${id}`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setSuccess("✔ Product updated successfully!");

            setTimeout(() => {
                navigate(`/product/${id}`);
            }, 800);

        } catch (error) {
            setSuccess("❌ Failed to update");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Update Product
                </h1>

                {success && (
                    <p className="text-center text-green-600 font-semibold mb-4">{success}</p>
                )}

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

                    {/* Form Column */}
                    <div className="space-y-5">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            placeholder="Product Name"
                        />

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            placeholder="Brand"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            rows="3"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            placeholder="Description"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                                placeholder="Price"
                            />

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                                placeholder="Category"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                name="releaseDate"
                                value={formData.releaseDate.split("T")[0]}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                                placeholder="Quantity"
                            />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="available"
                                checked={formData.available}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />
                            <span className="text-gray-700 font-medium">Available</span>
                        </label>
                    </div>

                    {/* Image Column */}
                    <div className="flex flex-col items-center">

                        <img
                            src={preview}
                            className="w-60 h-60 object-cover rounded-xl shadow-md mb-6"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }}
                            className="block w-full text-sm py-2 border rounded-lg cursor-pointer"
                        />
                    </div>

                </form>

                <button
                    onClick={handleSubmit}
                    className="mt-10 w-full py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition text-lg font-semibold"
                >
                    Update Product
                </button>

            </div>
        </div>
    );
}
