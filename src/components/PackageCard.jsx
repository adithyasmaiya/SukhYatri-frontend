import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PackageCard({ pkg, onBook }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // 🎞️ AUTO IMAGE SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % pkg.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [pkg.images.length]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
      onClick={() => navigate(`/package/${pkg.id}`)} // 🔥 OPEN DETAILS PAGE
    >

      {/* 🖼️ IMAGE SLIDER */}
      <img
        src={pkg.images[index]}
        alt={pkg.title}
        className="w-full h-48 object-cover"
      />

      {/* 📦 CONTENT */}
      <div className="p-4">

        <h2 className="text-lg font-semibold">{pkg.title}</h2>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {pkg.description}
        </p>

        <div className="flex justify-between items-center mt-3">

          <p className="text-red-500 font-bold text-lg">
            ₹{pkg.price}
          </p>

          {/* 🔥 BOOK BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🚫 prevent navigation
              onBook(pkg);
            }}
            className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-3 py-1 rounded-lg text-sm hover:scale-105 transition"
          >
            Book Now
          </button>

        </div>
      </div>
    </motion.div>
  );
}         