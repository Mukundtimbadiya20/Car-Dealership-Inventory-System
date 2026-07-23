import API from "../api/api";

export default function VehicleCard({ vehicle, refreshVehicles }) {
  const purchaseVehicle = async () => {
    try {
      await API.post(`/vehicles/${vehicle.id}/purchase`);

      alert("Vehicle Purchased Successfully 🚗");

      refreshVehicles();
    } catch (error) {
      alert(error.response?.data?.detail || "Purchase Failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900"
        alt="Car"
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {vehicle.make}
        </h2>

        <p className="text-gray-600 mb-4">
          {vehicle.model}
        </p>

        <div className="space-y-2">

          <div className="flex justify-between">
            <span className="font-semibold">
              Category
            </span>

            <span>{vehicle.category}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Price
            </span>

            <span className="text-green-600 font-bold">
              ₹ {vehicle.price.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Stock
            </span>

            <span
              className={
                vehicle.quantity > 0
                  ? "text-blue-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {vehicle.quantity}
            </span>
          </div>

        </div>

        <button
          disabled={vehicle.quantity === 0}
          onClick={purchaseVehicle}
          className={`w-full mt-6 py-3 rounded-xl font-bold transition ${
            vehicle.quantity === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {vehicle.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>

      </div>
    </div>
  );
}