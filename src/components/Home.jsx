import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/products");
            setProducts(res.data);
        } catch (error) {
            console.log("error : ", error);
        }
    };

    const handleOpenProduct = (id) => navigate(`/product/${id}`)

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Products
                </h1>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((e) => (
                        <li
                            key={e.id}
                            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                            onClick={() => handleOpenProduct(e.id)}
                        >
                            <div className="p-5 flex flex-col h-full justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {e.name}
                                    </h2>
                                    <p className="text-gray-600 mt-2 text-sm">
                                        {e.description}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <span className="text-lg font-bold text-indigo-600">
                                        ${e.price}
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
