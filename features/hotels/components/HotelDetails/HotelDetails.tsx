import type { Hotel } from "@/features/hotels/types";
import { GuestProfileCard } from "@/features/guests/components/GuestProfileCard/GuestProfileCard";
import { useMemo } from "react";

type Props = {
  hotel: Hotel | null;
  segmentFilter: string | null;
  onSegmentFilterChange: (value: string | null) => void;
};

const ALL_SEGMENTS = [
  "High LTV",
  "Direct Booker",
  "Loyalty",
  "OTA",
  "Corporate",
  "Upsell candidate"
];

export const HotelDetails: React.FC<Props> = ({
  hotel,
  segmentFilter,
  onSegmentFilterChange
}) => {
  const visibleGuests = useMemo(() => {
    if (!hotel) return [];
    if (!segmentFilter) return hotel.guestProfiles;
    return hotel.guestProfiles.filter((g) => g.segments.includes(segmentFilter));
  }, [hotel, segmentFilter]);

  if (!hotel) {
    return (
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 flex flex-col">
        <div className="text-sm text-slate-400">
          Select a hotel from the left to view its unified guest profiles.
        </div>
      </section>
    );
  }

  return (
    <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-semibold">{hotel.name}</h2>
          <p className="text-xs text-slate-400">
            {hotel.city}, {hotel.country} · {hotel.rooms} rooms ·{" "}
            {"★".repeat(hotel.starRating)}
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <div>
            <div className="text-slate-400 uppercase tracking-wide">
              Occupancy
            </div>
            <div className="text-sm">
              {(hotel.occupancyRate * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wide">
              Revenue (month)
            </div>
            <div className="text-sm">
              €{hotel.revenueThisMonth.toLocaleString("en-US")}
            </div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wide">
              Guests
            </div>
            <div className="text-sm">
              {hotel.guestProfiles.length}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-400">Filter by segment:</span>
        {ALL_SEGMENTS.map((seg) => {
          const active = seg === segmentFilter;
          return (
            <button
              key={seg}
              onClick={() => onSegmentFilterChange(active ? null : seg)}
              className={`px-2 py-1 rounded-full text-xs border ${
                active
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-slate-700 hover:border-slate-500"
              }`}
              data-testid={`segment-chip-${seg}`}
            >
              {seg}
            </button>
          );
        })}
        {segmentFilter && (
          <button
            onClick={() => onSegmentFilterChange(null)}
            className="text-xs text-sky-400 underline ml-1"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto grid gap-2 md:grid-cols-2">
        {visibleGuests.map((guest) => (
          <GuestProfileCard key={guest.id} guest={guest} />
        ))}
        {visibleGuests.length === 0 && (
          <div className="text-xs text-slate-500 mt-4">
            No guests in this segment for now.
          </div>
        )}
      </div>
    </section>
  );
};
