'use client';

import { useEffect, useState } from 'react';
import { HotelDetails } from '../HotelDetails/HotelDetails';
import { HotelList } from '../HotelList/HotelList';
import { fetchHotelDetails, fetchHotels } from '@/app/lib/api';

export type HotelSummary = any;
export type HotelWithGuests = any;

type SegmentFilter = string | null;

export function HotelDashboard() {
  const [hotels, setHotels] = useState<HotelSummary[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<HotelWithGuests | null>(
    null,
  );
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(null);

  const [loading, setLoading] = useState(true);
  const [loadingHotel, setLoadingHotel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const hotelsFromApi = await fetchHotels();
        setHotels(hotelsFromApi);

        if (hotelsFromApi.length > 0) {
          const first = hotelsFromApi[0];
          setSelectedHotelId(first.id);
          const details = await fetchHotelDetails(first.id);
          setSelectedHotel(details);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load hotels from API.');
      } finally {
        setLoading(false);
      }
    };

    // fire-and-forget
    void load();
  }, []);

  // When user clicks on a hotel in the list
  const handleSelectHotel = async (id: string) => {
    if (id === selectedHotelId) return;

    setSelectedHotelId(id);
    setLoadingHotel(true);
    setError(null);

    try {
      const details = await fetchHotelDetails(id);
      setSelectedHotel(details);
    } catch (err) {
      console.error(err);
      setError('Failed to load hotel details.');
    } finally {
      setLoadingHotel(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSegmentFilterChange = (value: SegmentFilter) => {
    setSegmentFilter(value);
  };

  const filteredHotels = hotels.filter((hotel: any) => {
    if (!search) return true;

    const term = search.toLowerCase();
    return (
      hotel.name?.toLowerCase().includes(term) ||
      hotel.city?.toLowerCase().includes(term) ||
      hotel.country?.toLowerCase().includes(term)
    );
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">
            Familiar Lite – Hotel CRM Demo
          </h1>
          <p className="text-sm text-slate-400">
            Unified guest profiles &amp; marketing insights (backed by NestJS +
            Postgres API).
          </p>
        </header>

        {error && (
          <div className="mb-4 rounded-md border border-red-500/40 bg-red-900/20 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-[400px] items-center justify-center text-slate-400">
            Loading hotels…
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-[280px,minmax(0,1fr)]">
            {/* LEFT: hotel list */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
              <HotelList
                hotels={filteredHotels}
                selectedHotelId={selectedHotelId ?? ''}
                search={search}
                onSearchChange={handleSearchChange}
                onSelectHotel={handleSelectHotel}
              />
            </section>

            {/* RIGHT: details */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
              {loadingHotel || !selectedHotel ? (
                <div className="flex h-full items-center justify-center text-slate-400">
                  {loadingHotel
                    ? 'Loading hotel details…'
                    : 'Select a hotel to see details.'}
                </div>
              ) : (
                <HotelDetails
                  hotel={selectedHotel}
                  segmentFilter={segmentFilter}
                  onSegmentFilterChange={handleSegmentFilterChange}
                />
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
