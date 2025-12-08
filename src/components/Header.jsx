import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="h-15 border px-10 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Link to="/" className="border px-4 py-2 rounded-2xl">Home</Link>
            <Link to="/add-product" className="border px-4 py-2 rounded-2xl">Add Product</Link>

            </div>
            <Link to="/login" className="border px-4 py-2 rounded-2xl">Login</Link>
        </div>
    )
}

export default Header