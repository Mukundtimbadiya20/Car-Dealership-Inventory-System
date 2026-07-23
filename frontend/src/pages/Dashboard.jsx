import { useEffect, useState } from "react";
import API from "../api/api";

import Navbar from "../components/Navbar";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const keyword = search.toLowerCase();

    return (
      vehicle.make.toLowerCase().includes(keyword) ||
      vehicle.model.toLowerCase().includes(keyword) ||
      vehicle.category.toLowerCase().includes(keyword)
    );
  });

  const totalStock = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.quantity,
    0
  );

  const totalCategories = new Set(
    vehicles.map((vehicle) => vehicle.category)
  ).size;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-8">

          <h1 className="text-4xl font-bold mb-8">
            🚗 Car Dealership Inventory
          </h1>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-gray-500 text-lg">
                Total Vehicles
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                {vehicles.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-gray-500 text-lg">
                Available Stock
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {totalStock}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-gray-500 text-lg">
                Categories
              </h2>

              <p className="text-4xl font-bold text-purple-600 mt-2">
                {totalCategories}
              </p>
            </div>

          </div>

          {/* Search */}
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {/* Vehicle List */}

          {loading ? (
            <div className="text-center mt-20 text-xl font-semibold">
              Loading vehicles...
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center mt-20 text-gray-500 text-xl">
              No Vehicles Found
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  refreshVehicles={fetchVehicles}
                />
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}