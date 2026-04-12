import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* 🌄 BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✨ CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-2xl text-white px-6"
      >
        <h1 className="text-5xl font-bold mb-4">
          SukhYatri 🌍
        </h1>

        <p className="text-lg mb-4">
          Travel in Comfort, Arrive in Joy ✈️
        </p>

        <p className="text-gray-200 mb-8">
          Explore India's most beautiful destinations with curated packages,
          seamless booking, and unforgettable experiences.
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-lg"
        >
          Explore Destinations
        </button>
      </motion.div>
    </div>
  );
}