import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProduct = async () => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_API_URL + `/product/${id}`
            );

            const imageRes = await axios.get(
                import.meta.env.VITE_API_URL + `/product/${id}/image`,
                { responseType: 'blob' }
            );

            const imageUrl = URL.createObjectURL(imageRes.data);
            setProduct({ ...res.data, imageUrl });
        } catch (error) {
            console.log("error : ", error);
        } finally {
            setLoading(false);
        }
    };


    const gotoUpdatePage = () => navigate(`/update-product/${id}`, { state: { product } })

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(import.meta.env.VITE_API_URL + `/product/${product.id}`);

            alert("Product deleted!");
            navigate("/")
        } catch (error) {
            alert("Delete failed.");
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-red-600 font-semibold">
                Product not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8">

                {/* GRID: IMAGE LEFT - DETAILS RIGHT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* IMAGE SECTION */}
                    <div className="flex justify-center items-start">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full max-w-sm rounded-lg shadow-md border"
                        />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

                        <p className="text-gray-500 mt-2 text-sm">
                            Category: <span className="font-medium">{product.category}</span>
                        </p>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-700">Description</h2>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Brand</h3>
                                <p className="text-gray-600 mt-1">{product.brand}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Price</h3>
                                <p className="text-indigo-600 text-2xl font-bold mt-1">
                                    ${product.price}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Availability</h3>
                                <p className={`mt-1 font-medium ${product.available ? "text-green-600" : "text-red-600"}`}>
                                    {product.available ? "In Stock" : "Out of Stock"}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Quantity</h3>
                                <p className="text-gray-600 mt-1">{product.quantity}</p>
                            </div>

                            <div className="col-span-2">
                                <h3 className="text-lg font-semibold text-gray-700">Release Date</h3>
                                <p className="text-gray-600 mt-1">
                                    {new Date(product.releaseDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                disabled={!product.available}
                                className={`px-6 py-3 rounded-lg font-semibold text-white 
                                    ${product.available ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}
                                `}
                            >
                                {product.available ? "Add to Cart" : "Unavailable"}
                            </button>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={gotoUpdatePage}
                                className="px-6 py-3 rounded-lg font-semibold text-white bg-yellow-600 hover:bg-yellow-700"
                            >
                                Update
                            </button>

                            <button
                                onClick={handleDelete}
                                className="px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product;
