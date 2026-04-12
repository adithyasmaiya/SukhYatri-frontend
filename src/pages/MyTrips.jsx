import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔒 BLOCK ACCESS
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Trips ✈️</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="bg-white p-4 mb-4 rounded shadow">
            <h2 className="font-semibold">{b.packageName}</h2>
            <p>₹{b.price}</p>
            <p>Travellers: {b.travellers}</p>
            <p>
              Travel Date:{" "}
              {new Date(b.travelDate).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}