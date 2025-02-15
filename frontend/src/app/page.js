"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LeagueTabs from "./components/LeagueTabs";

export default function Home() {
  const router = useRouter(); // ✅ Move this inside the function
  const [selectedLeague, setSelectedLeague] = useState(39); // Default: Premier League
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://live-sports-score-app.onrender.com";

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}?league=${selectedLeague}`);
        console.log("API Response:", response.data);
        setMatches(response.data.response || []);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
      setLoading(false);
    };

    fetchMatches();
  }, [selectedLeague]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">⚽ Live Sports Scores</h1>

      {/* League Tabs */}
      <LeagueTabs selectedLeague={selectedLeague} setSelectedLeague={setSelectedLeague} />

      {/* Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {loading ? (
          <p className="text-yellow-500 text-center">Loading matches...</p>
        ) : matches.length > 0 ? (
          matches.map((match, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push(`/match/${match.fixture.id}`)} // ✅ Now clickable
            >
              <h2 className="text-xl font-semibold text-center">{match.league?.name}</h2>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center space-x-2">
                  <img src={match.teams?.home?.logo} alt={match.teams?.home?.name} className="w-8 h-8" />
                  <span>{match.teams?.home?.name}</span>
                </div>
                <span className="text-2xl font-bold">{match.goals?.home ?? 0} - {match.goals?.away ?? 0}</span>
                <div className="flex items-center space-x-2">
                  <span>{match.teams?.away?.name}</span>
                  <img src={match.teams?.away?.logo} alt={match.teams?.away?.name} className="w-8 h-8" />
                </div>
              </div>
              <p className="text-sm text-center text-gray-500 mt-2">{match.fixture?.status?.long}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-center">No live matches available.</p>
        )}
      </div>
    </div>
  );
}
