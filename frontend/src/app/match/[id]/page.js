// 

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function MatchStatsPage() {
  const { id } = useParams(); // ✅ Get match ID from the URL
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://live-sports-score-app.onrender.com";

  useEffect(() => {
    if (!id) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/match-stats/${id}`);
        console.log("Match Stats:", response.data);
        setStats(response.data.response || []);
      } catch (error) {
        console.error("Error fetching match stats:", error);
      }
      setLoading(false);
    };

    fetchStats();
  }, [id]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">📊 Match Statistics</h1>
      {loading ? (
        <p className="text-yellow-500 text-center">Loading stats...</p>
      ) : stats.length > 0 ? (
        <div className="max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          {stats.map((teamStats, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-xl font-semibold text-center">{teamStats.team.name}</h2>
              {teamStats.statistics.map((stat, idx) => (
                <p key={idx} className="text-sm text-gray-500">
                  {stat.type}: <span className="font-bold">{stat.value}</span>
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center">No statistics available.</p>
      )}
      <button onClick={() => window.history.back()} className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg">
        🔙 Back to Matches
      </button>
    </div>
  );
}
