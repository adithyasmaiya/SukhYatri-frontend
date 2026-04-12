export default function Card({ p }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow hover:shadow-xl hover:scale-105 transition">

      <img src={p.image} className="h-52 w-full object-cover" />

      <div className="p-3">
        <h2 className="font-semibold">{p.title}</h2>
        <p className="text-gray-500 text-sm">{p.destination}</p>

        <div className="flex justify-between mt-2">
          <span className="font-bold">₹{p.price}</span>
          <span className="text-yellow-500">★ 4.7</span>
        </div>
      </div>
    </div>
  );
}