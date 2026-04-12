import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // 🔥 ADD THIS

export default function Explore() {
  const [selected, setSelected] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState({});

  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [phone, setPhone] = useState("");

  const packages = [
    {
      name: "Goa Beach Escape",
      price: 7999,
      desc: "Sunny beaches & nightlife",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      ],
    },
    {
      name: "Manali Adventure",
      price: 9999,
      desc: "Snow mountains & adventure",
      images: [
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
        "https://images.unsplash.com/photo-1590608897129-79da98d15969",
      ],
    },
  ];

  /* CARD SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      setCardIndex((prev) => {
        const updated = { ...prev };
        packages.forEach((pkg, i) => {
          const current = prev[i] || 0;
          updated[i] =
            current === pkg.images.length - 1 ? 0 : current + 1;
        });
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* FULLSCREEN SLIDER */
  useEffect(() => {
    if (!selected) return;

    const interval = setInterval(() => {
      setImgIndex((prev) =>
        prev === selected.images.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [selected]);

  /* BOOKING */
  const handleBooking = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      toast.error("Login first ❗");
      return;
    }

    const amount = selected.price * travellers;

    /* 🔥 CREATE ORDER */
    const { data: order } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount }
    );

    const options = {
      key: "rzp_test_SaHKqVeOgGtDOY",
      amount: order.amount,
      currency: "INR",
      name: "SukhYatri",
      description: selected.name,

      handler: async function (response) {
        // ✅ AFTER PAYMENT SUCCESS → SAVE BOOKING

        const payload = {
          userName: user?.name || "Guest",
          phone,
          packageName: selected.name,
          price: amount,
          travellers,
          travelDate: date,
        };

        await axios.post(
          "http://localhost:5000/api/bookings",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Payment successful 🎉 Booking confirmed");
        setShowBooking(false);
      },

      prefill: {
        name: user?.name,
        contact: phone,
      },

      theme: {
        color: "#ef4444",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    toast.error("Payment failed ❌");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => {
              setSelected(pkg);
              setImgIndex(0);
            }}
          >
            <img
              src={pkg.images[cardIndex[i] || 0]}
              className="w-full h-56 object-cover transition duration-500"
              alt="package"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{pkg.name}</h2>
              <p className="text-gray-600 text-sm">{pkg.desc}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-lg">₹{pkg.price}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(pkg);
                  }}
                  className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-4 py-1 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN VIEW */}
      {selected && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-5 right-6 text-white text-3xl z-50"
          >
            ✕
          </button>

          <img
            src={selected.images[imgIndex]}
            className="w-full h-[70vh] object-cover transition duration-500"
            alt="fullscreen"
          />

          <div className="bg-white rounded-t-3xl p-6 -mt-6 flex-1">

            <h1 className="text-2xl font-bold">{selected.name}</h1>
            <p className="mt-2 text-gray-600">{selected.desc}</p>
            <p className="mt-3 font-semibold text-lg">
              ₹{selected.price}
            </p>

            <button
              onClick={() => setShowBooking(true)}
              className="mt-6 w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 rounded-xl"
            >
              Book Now
            </button>

          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {showBooking && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">

          <div className="bg-white p-6 rounded-xl w-80">

            <h2 className="text-center font-semibold mb-3">
              {selected.name}
            </h2>

            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="number"
              min="1"
              value={travellers}
              onChange={(e) =>
                setTravellers(Number(e.target.value))
              }
              className="border p-2 w-full mb-2 rounded"
            />

            <input
              type="tel"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />

            <p className="text-center font-semibold mb-3">
              Total: ₹{selected.price * travellers}
            </p>

            <button
              onClick={handleBooking}
              className="bg-green-500 text-white w-full py-2 rounded"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setShowBooking(false)}
              className="mt-2 w-full border py-2 rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}