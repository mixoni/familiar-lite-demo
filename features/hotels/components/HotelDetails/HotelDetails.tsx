'use client';

import { GuestProfileCard } from "@/features/guests/components/GuestProfileCard/GuestProfileCard";


type SegmentFilter = string | null;

interface HotelDetailsProps {
  hotel: any;
  segmentFilter: SegmentFilter;
  onSegmentFilterChange: (segment: SegmentFilter) => void;
}

export function HotelDetails({
  hotel,
  segmentFilter,
  onSegmentFilterChange,
}: HotelDetailsProps) {

  const allGuests: any[] = Array.isArray(hotel?.guestProfiles)
    ? hotel.guestProfiles
    : Array.isArray(hotel?.guests)
    ? hotel.guests
    : [];

  const filteredGuests =
    segmentFilter == null
      ? allGuests
      : allGuests.filter((g) =>
          Array.isArray(g.segments)
            ? g.segments.includes(segmentFilter)
            : false,
        );

  const occupancy = hotel?.occupancy ?? hotel?.metrics?.occupancy ?? null;
  const revenue = hotel?.revenue ?? hotel?.metrics?.revenueMonthly ?? null;

  const segments: string[] = hotel?.segments ?? [
    'High LTV',
    'Direct Booker',
    'OTA',
    'Corporate',
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="border-b border-slate-800 pb-3">
        <h2 className="text-xl font-semibold">{hotel?.name}</h2>
        <p className="text-sm text-slate-400">
          {hotel?.city}, {hotel?.country}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
          <div>
            <div className="text-xs text-slate-400">Occupancy</div>
            <div className="text-sm">
              {occupancy != null ? `${occupancy}%` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Revenue (month)</div>
            <div className="text-sm">
              {revenue != null ? `€${revenue.toLocaleString('en-US')}` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Guests in CRM</div>
            <div className="text-sm">{allGuests.length || 'N/A'}</div>
          </div>
        </div>
      </header>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-slate-200">
          Filter by segment
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => onSegmentFilterChange(null)}
            className={`rounded-full border px-3 py-1 transition ${
              segmentFilter === null
                ? 'border-sky-500 bg-sky-500/10 text-sky-200'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
            }`}
          >
            All
          </button>
          {segments.map((segment) => (
            <button
              key={segment}
              type="button"
              onClick={() =>
                onSegmentFilterChange(
                  segmentFilter === segment ? null : segment,
                )
              }
              className={`rounded-full border px-3 py-1 transition ${
                segmentFilter === segment
                  ? 'border-sky-500 bg-sky-500/10 text-sky-200'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
              }`}
            >
              {segment}
            </button>
          ))}
        </div>
      </section>

      <section className="flex-1 overflow-auto rounded-lg border border-slate-800 bg-slate-950/40 p-3">
        {allGuests.length === 0 ? (
          <p className="text-sm text-slate-400">
            No guests found for this hotel yet.
          </p>
        ) : filteredGuests.length === 0 ? (
          <p className="text-sm text-slate-400">
            No guests match the selected segment filter.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredGuests.map((guest) => (
              <GuestProfileCard key={guest.id} guest={guest} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
