import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSignup = async () => {
    try {
      // signup
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      // auto login
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.error || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="bg-white p-6 rounded-xl shadow w-80"
      >
        <h2 className="text-xl mb-4 text-center">Signup</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full mb-3"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-2 top-2 cursor-pointer text-sm"
          >
            {showPwd ? "Hide" : "Show"}
          </span>
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white w-full py-2"
        >
          Signup
        </button>

      </form>
    </div>
  );
}