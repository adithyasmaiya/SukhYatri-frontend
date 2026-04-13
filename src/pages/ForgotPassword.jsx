import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handle = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, { email });
      navigate("/otp", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.error || "Error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handle();
        }}
        className="bg-white p-6 rounded-xl shadow w-80"
      >
        <h2 className="text-xl mb-4 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-red-500 text-white w-full py-2"
        >
          Send OTP
        </button>

      </form>
    </div>
  );
}