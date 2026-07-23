import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        🚗 Car Dealership
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/admin">Admin</Link>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}