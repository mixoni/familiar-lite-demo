import type { Hotel } from "@/features/hotels/types";

type Props = {
  hotels: Hotel[];
  selectedHotelId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectHotel: (hotelId: string) => void;
};

export const HotelList: React.FC<Props> = ({
  hotels,
  selectedHotelId,
  search,
  onSearchChange,
  onSelectHotel
}) => {
  return (
    <aside className="border border-slate-800 rounded-xl p-3 bg-slate-900/60 flex flex-col">
      <div className="mb-3">
        <label className="text-xs uppercase tracking-wide text-slate-400">
          Hotels
        </label>
        <input
          className="mt-1 w-full rounded-md bg-slate-900 border border-slate-700 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="Search by name, city, country…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          data-testid="hotel-search-input"
        />
      </div>

      <div className="flex-1 overflow-auto space-y-1">
        {hotels.map((hotel) => {
          const isActive = hotel.id === selectedHotelId;
          return (
            <button
              key={hotel.id}
              onClick={() => onSelectHotel(hotel.id)}
              className={`w-full text-left rounded-lg px-3 py-2 text-sm border transition-colors ${
                isActive
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-slate-800 hover:border-slate-600"
              }`}
              data-testid={`hotel-item-${hotel.id}`}
            >
              <div className="font-medium">{hotel.name}</div>
              <div className="text-xs text-slate-400">
                {hotel.city}, {hotel.country}
              </div>
              <div className="mt-1 text-[11px] text-slate-400 flex gap-3">
                <span>Occ: {(hotel.occupancyRate * 100).toFixed(0)}%</span>
                <span>Rooms: {hotel.rooms}</span>
                <span>
                  Rev: €
                  {hotel.revenueThisMonth.toLocaleString("en-US")}
                </span>
              </div>
            </button>
          );
        })}

        {hotels.length === 0 && (
          <div className="text-xs text-slate-500 mt-4">
            No hotels match this search.
          </div>
        )}
      </div>
    </aside>
  );
};
