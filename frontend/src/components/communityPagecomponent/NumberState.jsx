export default function NumberStat({ label, value }) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 text-sm">
      <span className="text-lg font-bold">{value.toLocaleString()}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}
