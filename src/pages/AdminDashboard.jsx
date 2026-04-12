import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalTravellers: 0,
    todayBookings: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    // 🔒 Protect route
    if (!token) {
      window.location.href = "/admin-login";
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("BOOKINGS:", res.data);

        const bookings = res.data || [];

        setData(bookings);
        setLoading(false);

        // 📊 CALCULATE STATS
        const totalBookings = bookings.length;

        const totalRevenue = bookings.reduce(
          (sum, b) => sum + (b.price || 0),
          0
        );

        const totalTravellers = bookings.reduce(
          (sum, b) => sum + (b.travellers || 0),
          0
        );

        const today = new Date().toLocaleDateString();

        const todayBookings = bookings.filter((b) => {
          if (!b.createdAt) return false;
          return (
            new Date(b.createdAt).toLocaleDateString() === today
          );
        }).length;

        setStats({
          totalBookings,
          totalRevenue,
          totalTravellers,
          todayBookings,
        });

      } catch (err) {
        console.log("FETCH ERROR:", err.response?.data || err.message);

        // ❗ ONLY logout if token invalid
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/admin-login";
        } else {
        toast.error("Error fetching bookings ❌");
          setLoading(false);
        }
      }
    };

    fetchBookings();

    // 🔁 AUTO REFRESH EVERY 10s
    const interval = setInterval(fetchBookings, 10000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard 📊
      </h1>

      {/* 📊 STATS */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h2 className="text-xl font-bold">{stats.totalBookings}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-xl font-bold">₹{stats.totalRevenue}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Travellers</p>
            <h2 className="text-xl font-bold">{stats.totalTravellers}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Today</p>
            <h2 className="text-xl font-bold">{stats.todayBookings}</h2>
          </div>

        </div>
      )}

      {/* 📋 TABLE */}
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No bookings found 😕
        </p>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">User</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Package</th>
                <th className="p-3">Price</th>
                <th className="p-3">Travellers</th>
                <th className="p-3">Travel Date</th>
                <th className="p-3">Booked On</th>
              </tr>
            </thead>

            <tbody>
              {data.map((b) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">

                  <td className="p-3">{b.userName || "N/A"}</td>
                  <td className="p-3">{b.phone || "-"}</td>
                  <td className="p-3">{b.packageName}</td>
                  <td className="p-3 font-semibold">₹{b.price}</td>
                  <td className="p-3">{b.travellers}</td>

                  <td className="p-3">
                    {b.travelDate
                      ? new Date(b.travelDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}