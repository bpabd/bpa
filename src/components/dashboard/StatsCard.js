// src/components/dashboard/StatsCard.js

export default function StatsCard({ title, value, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mb-2">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}