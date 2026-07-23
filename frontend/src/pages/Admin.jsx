import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addVehicle = async (e) => {
    e.preventDefault();

    try {
      await API.post("/vehicles", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      alert("Vehicle Added");

      setForm({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
      });

      fetchVehicles();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await API.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      alert(err.response?.data?.detail || "Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <form
        onSubmit={addVehicle}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded">
          Add Vehicle
        </button>
      </form>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Make</th>
              <th>Model</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="text-center border-t">
                <td>{v.make}</td>
                <td>{v.model}</td>
                <td>{v.category}</td>
                <td>₹{v.price}</td>
                <td>{v.quantity}</td>

                <td>
                  <button
                    onClick={() => deleteVehicle(v.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}