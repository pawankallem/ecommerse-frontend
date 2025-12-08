import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/products");

            const updatedProducts = await Promise.all(
                res.data.map(async (product) => {
                    try {
                        const imageRes = await axios.get(
                            import.meta.env.VITE_API_URL + `/product/${product.id}/image`,
                            { responseType: 'blob' }
                        );
                        const imageUrl = URL.createObjectURL(imageRes.data);
                        return { ...product, imageUrl };
                    } catch (error) {
                        console.log("error : ", error);
                        return { ...product, imageUrl: "" };
                    }
                })
            );

            setProducts(updatedProducts);
        } catch (error) {
            console.log("error : ", error);
        }
    };

    const handleOpenProduct = (id) => navigate(`/product/${id}`);

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-10 text-gray-800">
                    Explore Products
                </h1>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden border"
                            onClick={() => handleOpenProduct(product.id)}
                        >
                            {/* Product Image */}
                            <div className="w-full h-52 bg-gray-200 flex items-center justify-center overflow-hidden">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-500">No Image</span>
                                )}
                            </div>

                            {/* Product Body */}
                            <div className="p-5 flex flex-col justify-between h-[200px]">

                                {/* Title */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                        {product.name}
                                    </h2>

                                    {/* Category + Brand */}
                                    <p className="text-xs text-gray-500 mt-1">
                                        {product.category} • {product.brand}
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Price + Stock */}
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-bold text-indigo-600">
                                        ${product.price}
                                    </span>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-semibold 
                                            ${product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                                        `}
                                    >
                                        {product.available ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
