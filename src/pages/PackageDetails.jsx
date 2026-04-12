import { useParams, useNavigate } from "react-router-dom";
import { packages } from "../data/packages";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === parseInt(id));

  const [date, setDate] = useState(new Date());
  const [travellers, setTravellers] = useState(1);
  const [phone, setPhone] = useState("");

  // ❌ safety check
  if (!pkg) {
    return <div className="p-6">Package not found ❌</div>;
  }

  /* 🔥 BOOKING */
  const handleBooking = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❗");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/bookings",
      {
        phone,
        packageName: pkg.name,
        price: pkg.price * travellers,
        travellers,
        travelDate: new Date(date).toISOString(), // ✅ FIX
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
      }
    );

    alert("Booking successful ✅");

  } catch (err) {
    console.log("ERROR:", err.response?.data);
    alert(err.response?.data?.error || "Booking failed ❌");
  }
};
  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-black text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      {/* 🖼️ IMAGE */}
      <img
        src={pkg.images[0]}
        className="w-full h-80 object-cover"
      />

      {/* DETAILS */}
      <div className="p-6 bg-white rounded-t-3xl -mt-10">

        <h1 className="text-3xl font-bold">{pkg.title}</h1>
        <p className="text-xl text-red-500 mt-1">
          ₹{pkg.price} / person
        </p>

        <p className="mt-4 text-gray-700">
          {pkg.description}
        </p>

        {/* 📅 BOOK SECTION */}
        <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-3">
            Book This Trip ✈️
          </h2>

          {/* DATE */}
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            minDate={new Date()}
            className="border p-2 rounded w-full"
          />

          {/* TRAVELLERS */}
          <input
            type="number"
            min="1"
            value={travellers}
            onChange={(e) =>
              setTravellers(Number(e.target.value))
            }
            className="border p-2 rounded w-full mt-3"
          />

          {/* PHONE */}
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded w-full mt-3"
          />

          {/* TOTAL */}
          <p className="mt-3 font-semibold">
            Total: ₹{pkg.price * travellers}
          </p>

          {/* BUTTON */}
          <button
            onClick={handleBooking}
            className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-2 rounded-xl"
          >
            Book Now
          </button>

        </div>

      </div>
    </div>
  );
}