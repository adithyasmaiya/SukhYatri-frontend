import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("CLICKED LOGIN");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ❌ safety check
      if (!res.data.user) {
        return alert("User data missing ❌");
      }

      if (res.data.user.role !== "admin") {
        return alert("Access denied ❌ Not admin");
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ REDIRECT
      window.location.href = "/admin-dashboard";

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-xl mb-4 text-center font-semibold">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
          >
            {showPwd ? "Hide" : "Show"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}