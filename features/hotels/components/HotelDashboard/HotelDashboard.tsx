"use client";

import { useMemo, useState } from "react";
import type { Hotel } from "@/features/hotels/types";
import { HotelList } from "@/features/hotels/components/HotelList/HotelList";
import { HotelDetails } from "@/features/hotels/components/HotelDetails/HotelDetails";

type Props = {
  initialHotels: Hotel[];
};

export const HotelDashboard: React.FC<Props> = ({ initialHotels }) => {
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(
    initialHotels[0]?.id ?? null
  );
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string | null>(null);

  const filteredHotels = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return initialHotels;
    return initialHotels.filter(
      (h) =>
        h.name.toLowerCase().includes(term) ||
        h.city.toLowerCase().includes(term) ||
        h.country.toLowerCase().includes(term)
    );
  }, [initialHotels, search]);

  const selectedHotel = useMemo(
    () => filteredHotels.find((h) => h.id === selectedHotelId) ?? filteredHotels[0] ?? null,
    [filteredHotels, selectedHotelId]
  );

  const summary = useMemo(() => {
    const totalHotels = filteredHotels.length;
    const totalRooms = filteredHotels.reduce((acc, h) => acc + h.rooms, 0);
    const avgOcc =
      filteredHotels.reduce((acc, h) => acc + h.occupancyRate, 0) /
      (filteredHotels.length || 1);
    const totalRevenue = filteredHotels.reduce(
      (acc, h) => acc + h.revenueThisMonth,
      0
    );
    return { totalHotels, totalRooms, avgOcc, totalRevenue };
  }, [filteredHotels]);

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryTile label="Hotels" value={summary.totalHotels.toString()} />
        <SummaryTile label="Rooms" value={summary.totalRooms.toLocaleString("en-US")} />
        <SummaryTile
          label="Avg occupancy"
          value={`${(summary.avgOcc * 100).toFixed(0)}%`}
        />
        <SummaryTile
          label="Monthly revenue"
          value={`€${summary.totalRevenue.toLocaleString("en-US")}`}
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[340px,1fr] gap-4 h-[520px]">
        <HotelList
          hotels={filteredHotels}
          selectedHotelId={selectedHotel?.id ?? null}
          search={search}
          onSearchChange={setSearch}
          onSelectHotel={setSelectedHotelId}
        />

        <HotelDetails
          hotel={selectedHotel}
          segmentFilter={segmentFilter}
          onSegmentFilterChange={setSegmentFilter}
        />
      </div>
    </div>
  );
};

type SummaryProps = {
  label: string;
  value: string;
};

const SummaryTile: React.FC<SummaryProps> = ({ label, value }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
    <div className="text-[11px] uppercase tracking-wide text-slate-400">
      {label}
    </div>
    <div className="text-sm font-semibold mt-1">{value}</div>
  </div>
);
