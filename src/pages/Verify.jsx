import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get(
          `http://localhost:5000/api/auth/verify/${token}`
        );

        setStatus("Email verified successfully 🎉");

      } catch (err) {
        console.log(err);
        setStatus("Invalid or expired link ❌");
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      {status}
    </div>
  );
}