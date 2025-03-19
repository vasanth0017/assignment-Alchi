"use client"
import { useState } from "react";

export default function WallColorChanger() {
  const [color, setColor] = useState("#ff573"); // Default color

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <img
        src="/room.webp" // Original image
        alt="Room"
        className="w-full"
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: color,
          mixBlendMode: "multiply", // Blend with the original image
        }}
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mt-4"
      />
    </div>
  );
}
