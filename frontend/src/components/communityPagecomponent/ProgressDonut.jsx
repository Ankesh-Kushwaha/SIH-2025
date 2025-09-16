export default function ProgressDonut({ value = 65 }) {
  const strokeDasharray = `${value}, 100`;
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        ></path>
        <path
          className="text-green-500"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          strokeWidth="3"
        ></path>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {value}%
      </div>
    </div>
  );
}
