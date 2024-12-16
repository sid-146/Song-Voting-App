"use client";

import { useEffect, useState } from "react";

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaylist();
  }, []);

  const loadPlaylist = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://song-voting-app-be.onrender.com/api/songs"
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlaylistName(data.name);
      setSongs(
        data.tracks.map((track) => ({
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          album: "",
          duration: "",
          addedBy: track.added_by,
        }))
      );
    } catch (error) {
      console.error("Error loading playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-spotify-gray-dark rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#404040]">
          <h2 className="text-spotify-white text-2xl font-bold flex items-center gap-3">
            <i className="fas fa-music text-spotify-green"></i>
            {playlistName}
          </h2>
          <span className="bg-spotify-green text-black px-4 py-1 rounded-full text-sm font-bold">
            {songs.length} songs
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-spotify-green border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-spotify-gray-light text-sm font-medium">
                <tr className="border-b border-[#404040]">
                  <th className="p-4 w-16">#</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Artist</th>
                  <th className="p-4">Album</th>
                  <th className="p-4 w-28">Duration</th>
                  <th className="p-4 w-28">Added By</th>
                  <th className="p-4 w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="text-spotify-white">
                {songs.map((song, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#404040] group transition-colors border-b border-[#404040] last:border-none"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-play text-spotify-green opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        <span>{song.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-spotify-gray-light">
                      {song.artist}
                    </td>
                    <td className="p-4 text-spotify-gray-light">
                      {song.album}
                    </td>
                    <td className="p-4 text-spotify-gray-light">
                      {song.duration}
                    </td>
                    <td className="p-4 text-spotify-gray-light">
                      {song.addedBy}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:text-spotify-green transition-colors">
                          <i className="fas fa-heart"></i>
                        </button>
                        <button className="p-2 hover:text-spotify-red transition-colors">
                          <i className="fas fa-minus"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
