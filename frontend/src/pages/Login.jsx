import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.access_token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          New User?
          <Link className="text-blue-600 ml-1" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}