import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        brand: "",
        price: "",
        category: "",
        releaseDate: "",
        available: false,
        quantity: ""
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState("");
    const [isDragging, setIsDragging] = useState(false);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        // Object.keys(formData).forEach((key) => form.append(key, formData[key]));
        if (!image) {
            alert("please select image")
            return
        }
        form.append("imageFile", image);
        form.append(
            "product",
            new Blob([JSON.stringify(formData)], { type: "application/json" })
        )

        try {
            const res = await axios.post("http://localhost:8080/api/product", form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("res : ", res)
            setSuccess("✔ Product added successfully!");
        } catch (err) {
            setSuccess("❌ Error adding product");
        }
    };

    return (
        <div className="flex justify-center pt-12">
            <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-200">

                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add New Product
                </h2>

                {success && (
                    <p className="text-center text-green-600 font-semibold mb-4">
                        {success}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <label className="absolute text-gray-500 px-1 left-3 -top-2 bg-white text-sm transition-all peer-focus:text-blue-600">
                                Product Name
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="brand"
                                onChange={handleChange}
                                className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <label className="absolute text-gray-500 px-1 left-3 -top-2 bg-white text-sm peer-focus:text-blue-600">
                                Brand
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <textarea
                            name="description"
                            rows="3"
                            onChange={handleChange}
                            className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>
                        <label className="absolute text-gray-500 px-1 left-3 -top-2 bg-white text-sm peer-focus:text-blue-600">
                            Description
                        </label>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <label className="absolute text-gray-500 left-3 -top-2 bg-white text-sm px-1 peer-focus:text-blue-600">
                                Price ($)
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="category"
                                onChange={handleChange}
                                className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <label className="absolute text-gray-500 left-3 -top-2 bg-white text-sm px-1 peer-focus:text-blue-600">
                                Category
                            </label>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="date"
                                name="releaseDate"
                                onChange={handleChange}
                                className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <label className="absolute text-gray-500 left-3 -top-2 bg-white text-sm px-1">
                                Release Date
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                name="quantity"
                                onChange={handleChange}
                                className="peer w-full px-3 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <label className="absolute text-gray-500 left-3 -top-2 bg-white text-sm px-1">
                                Quantity
                            </label>
                        </div>
                    </div>

                    {/* Available Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="available"
                            onChange={handleChange}
                            className="w-5 h-5"
                        />
                        <label className="text-gray-700 font-medium">Available</label>
                    </div>

                    {/* Drag & Drop Image Upload */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition ${isDragging ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-400"}`}

                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}

                        onDragLeave={() => setIsDragging(false)}

                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);

                            const file = e.dataTransfer.files[0];
                            if (!file) return;

                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setImage(file);
                                setPreview(URL.createObjectURL(file));
                            }}
                        />

                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="mx-auto w-40 h-40 object-cover rounded-lg shadow-md"
                            />
                        ) : (
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <p className="text-gray-700 font-semibold">Drag & Drop or Click to Upload</p>
                            </label>
                        )}
                    </div>


                    {/* Image Upload (drag and drop style) */}
                    {/* <div className="border-2 border-dashed border-gray-400 rounded-lg p-5 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"
                        />

                        <label htmlFor="imageUpload" className="cursor-pointer">
                        {preview ? (
                            <img
                            src={preview}
                            alt="Preview"
                            className="w-40 h-40 object-cover mx-auto rounded-lg shadow"
                            />
                        ) : (
                            <div>
                            <p className="text-gray-600 font-medium">
                                Click or drag to upload product image
                            </p>
                            </div>
                        )}
                        </label>
                    </div> */}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
