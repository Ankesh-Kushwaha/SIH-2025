export default function NumberStat({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-lg font-bold text-green-900">{value}</span>
      </div>
      <span className="text-xs text-green-800 opacity-90">{label}</span>
    </div>
  );
}
