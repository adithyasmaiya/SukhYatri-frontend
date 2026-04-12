import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpReset() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || localStorage.getItem("resetEmail");

  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [timer, setTimer] = useState(30);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  if (!email) {
    return (
      <div className="flex items-center justify-center h-screen">
        Invalid access ❌
      </div>
    );
  }

  /* ================= RESET PASSWORD ================= */
  const resetPassword = async () => {
    const finalOtp = otpArray.join("");

    console.log("SENDING OTP:", finalOtp);

    if (finalOtp.length !== 6) {
      return alert("Enter full OTP ❗");
    }

    if (password !== confirm) {
      return alert("Passwords do not match ❌");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp: finalOtp,
        newPassword: password,
      });

      alert("Password reset successful 🎉");
      navigate("/login");

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.error || "Invalid OTP ❌");
    }
  };

  /* ================= RESEND OTP ================= */
  const resendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setTimer(30);
      setOtpArray(["", "", "", "", "", ""]);

      inputsRef.current[0]?.focus();

      alert("OTP resent 📩");

    } catch {
      alert("Failed to resend OTP ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        {/* OTP INPUT */}
        <div className="flex justify-between mb-4">
          {otpArray.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => {
                const val = e.target.value;

                if (!/^[0-9]?$/.test(val)) return;

                const newOtp = [...otpArray];
                newOtp[index] = val;
                setOtpArray(newOtp);

                if (val && index < 5) {
                  inputsRef.current[index + 1]?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  if (!otpArray[index] && index > 0) {
                    inputsRef.current[index - 1]?.focus();
                  }
                }
              }}
              className="w-10 h-12 text-center border rounded text-lg"
            />
          ))}
        </div>

        {/* PASSWORD */}
        <input
          type={showPwd ? "text" : "password"}
          placeholder="New Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type={showPwd ? "text" : "password"}
          placeholder="Confirm Password"
          className="border p-2 w-full mb-3 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <p
          onClick={() => setShowPwd(!showPwd)}
          className="text-sm text-gray-500 cursor-pointer mb-3"
        >
          {showPwd ? "Hide Password" : "Show Password"}
        </p>

        {/* SUBMIT */}
        <button
          onClick={resetPassword}
          className="w-full py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-orange-400"
        >
          Reset Password
        </button>

        {/* RESEND */}
        {timer > 0 ? (
          <p className="text-center text-sm mt-3 text-gray-500">
            Resend OTP in {timer}s
          </p>
        ) : (
          <p
            onClick={resendOtp}
            className="text-center text-sm mt-3 text-blue-500 cursor-pointer"
          >
            Resend OTP
          </p>
        )}

      </div>
    </div>
  );
}