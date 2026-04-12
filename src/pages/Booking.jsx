import { useParams } from "react-router-dom";
import API from "../api";

export default function Booking() {
  const { id } = useParams();

  const pay = async () => {
    const { data } = await API.post("/payment/create-order", {
      amount: 20000,
    });

    const rzp = new window.Razorpay({
      key: "rzp_test_SaHKqVeOgGtDOY",
      amount: data.amount,
      order_id: data.id,

      handler: async () => {
        await API.post("/bookings", {
          userId: "USER_ID",
          packageId: id,
          people: 2,
          totalPrice: 20000,
        });

        alert("Payment Successful 🎉");
      },
    });

    rzp.open();
  };

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <button
        onClick={pay}
        className="bg-red-500 text-white px-6 py-3 rounded-xl"
      >
        Pay & Book
      </button>
    </div>
  );
}