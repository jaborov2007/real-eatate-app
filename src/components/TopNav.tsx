"use client";

export default function TopNav() {
  return (
    <div className="sticky top-0 z-40 bg-black">
      {/* Search bar */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 bg-neutral-800 rounded-full px-4 py-2">
          <span className="text-neutral-400">🔍</span>
          <input
            placeholder="Search"
            className="flex-1 bg-transparent text-white placeholder-neutral-400 outline-none"
          />
          <button className="text-white">⚙️</button>
        </div>
      </div>

      {/* Context row */}
      <div className="px-4 pb-3 flex items-center justify-between text-sm">
        <div className="text-white font-medium">
          For sale <span className="opacity-70">▾</span>
        </div>

        <div className="text-neutral-400">175 of 1419 results</div>

        <button className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium">
          Save search
        </button>
      </div>
    </div>
  );
}
