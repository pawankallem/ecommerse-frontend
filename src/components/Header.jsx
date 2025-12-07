import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="h-15 border px-10 py-5 flex items-center justify-between">
            <Link to="/" className="border px-4 py-2 rounded-2xl">Home</Link>
            <Link to="/login" className="border px-4 py-2 rounded-2xl">Login</Link>
        </div>
    )
}

export default Header