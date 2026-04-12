import { useEffect, useState } from "react";
import API from "../api";
import Card from "../components/Card";

export default function Packages() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/packages").then((res) => setData(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((p) => (
        <a key={p._id} href={`/booking/${p._id}`}>
          <Card p={p} />
        </a>
      ))}
    </div>
  );
}