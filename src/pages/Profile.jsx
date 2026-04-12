import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("token");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reviews/user/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Reviews 👤</h1>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border p-4 mb-3 rounded">
            <p className="font-semibold">
              {r.packageName} ⭐ {r.rating}
            </p>
            <p className="text-gray-600">{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}