import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSelectProduct = (id) => {
        console.log("id : ", id)
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (query.length < 3) {
                setResults([]);
                return;
            }

            console.log("Searching for:", query);

            try {
                const res = await fetch(import.meta.env.VITE_API_URL + `/products/search?keyword=${query}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Error searching:", err);
            }
        };

        const delay = setTimeout(fetchData, 400); // debounce
        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className="h-15 border px-10 py-5 flex items-center justify-between relative">

            {/* Left Navigation */}
            <div className="flex items-center gap-2">
                <Link to="/" className="border px-4 py-2 rounded-2xl">Home</Link>
                <Link to="/add-product" className="border px-4 py-2 rounded-2xl">Add Product</Link>
            </div>

            {/* Search Bar */}
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Search product..."
                    className="border px-4 py-2 rounded-xl w-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Suggestions */}
                {results.length > 0 && (
                    <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg z-50">
                        {results.map((item) => (
                            <div
                                key={item.id}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSelectProduct(item.id)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Login Button */}
            <Link to="/login" className="border px-4 py-2 rounded-2xl">Login</Link>
        </div>
    );
};

export default Header;
