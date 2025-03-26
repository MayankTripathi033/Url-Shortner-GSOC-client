import React, { useState } from "react";
import apiClient from "../api/apiClient";

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [qrCode, setQrCode] = useState(""); // State to store the QR code URL
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await apiClient.shortenUrl(url);
      setShortenedUrl(response.shortUrl); // Assuming the API returns the shortened URL in this field
      setQrCode(response.qrCode); // Assuming the API returns the QR code URL in this field
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten the URL. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96" // Increased width
      >
        <h2 className="text-2xl mb-4 text-center">Shorten Your URL</h2>
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 mb-4 border rounded text-sm" // Fixed input size
          required
        />
        <button
          type="submit"
          className={`w-full p-3 rounded text-white text-sm ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Shorten URL"} {/* Show loader text */}
        </button>
        {shortenedUrl && (
          <div className="mt-4">
            <p className="text-green-600">Shortened URL:</p>
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {shortenedUrl}
            </a>
          </div>
        )}
        {qrCode && (
          <div className="mt-4">
            <p className="text-green-600">QR Code:</p>
            <img src={qrCode} alt="QR Code" className="w-40 h-40" />{" "}
            {/* Fixed QR code size */}
          </div>
        )}
      </form>
    </div>
  );
};

export default Dashboard;
