"use client";
import { useState } from "react";

const leagues = [
  { id: 39, name: "Premier League", logo: "https://media.api-sports.io/football/leagues/39.png" },
  { id: 140, name: "La Liga", logo: "https://media.api-sports.io/football/leagues/140.png" },
  { id: 78, name: "Bundesliga", logo: "https://media.api-sports.io/football/leagues/78.png" },
  { id: 135, name: "Serie A", logo: "https://media.api-sports.io/football/leagues/135.png" },
];

function LeagueTabs({ selectedLeague, setSelectedLeague }) {
  return (
    <div className="flex space-x-3 bg-gray-200 dark:bg-gray-800 p-2 rounded-lg">
      {leagues.map((league) => (
        <button
          key={league.id}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold ${
            selectedLeague === league.id
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-700 text-black dark:text-white"
          }`}
          onClick={() => setSelectedLeague(league.id)}
        >
          <img src={league.logo} alt={league.name} className="w-5 h-5" />
          <span>{league.name}</span>
        </button>
      ))}
    </div>
  );
}

export default LeagueTabs;