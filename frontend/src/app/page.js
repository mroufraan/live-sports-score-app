"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [scores, setScores] = useState([]);
  const API_URL = "https://live-sports-score-app.onrender.com/live-scores"; // Ensure this is correct

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        console.log("API Response on Vercel:", response.data);  // Debugging step
        setScores(response.data.response || []);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">⚽ Live Sports Scores</h1>
      <div className="w-full max-w-4xl">
        {scores.length > 0 ? (
          scores.map((match, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">
                {match.teams?.home?.name || "Unknown"} vs {match.teams?.away?.name || "Unknown"}
              </h2>
              <p className="text-lg">
                🏟 {match.league?.name || "Unknown League"} - {match.fixture?.status?.short || "Unknown Status"}  
                <br />
                ⚽ Score: {match.goals?.home ?? 0} - {match.goals?.away ?? 0}
              </p>
            </div>
          ))
        ) : (
          <p className="text-red-500">No live matches available.</p>
        )}
      </div>
    </div>
  );
}
