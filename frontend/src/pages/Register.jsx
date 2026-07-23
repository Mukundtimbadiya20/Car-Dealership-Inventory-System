import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />

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

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?
          <Link className="text-blue-600 ml-1" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}