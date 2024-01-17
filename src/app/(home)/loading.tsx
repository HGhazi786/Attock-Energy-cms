import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <p className="w-3 h-3 bg-brown rounded-full"></p>
        <p className="w-3 h-3 bg-brown rounded-full"></p>
        <p className="w-3 h-3 bg-brown rounded-full"></p>
      </div>
    </div>
  );
}
