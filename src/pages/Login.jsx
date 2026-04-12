import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full mb-1 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
          >
            {showPwd ? "Hide" : "Show"}
          </span>
        </div>

        {/* FORGOT PASSWORD */}
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-blue-500 mb-4 cursor-pointer hover:underline text-right"
        >
          Forgot Password?
        </p>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-xl"
        >
          Login
        </button>

      </form>
    </div>
  );
}