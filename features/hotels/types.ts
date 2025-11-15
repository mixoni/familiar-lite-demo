import type { GuestProfile } from "@/features/guests/types";

export type Hotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  occupancyRate: number;      // 0–1
  revenueThisMonth: number;   // €€
  rooms: number;
  starRating: number;         // 3–5
  guestProfiles: GuestProfile[];
};
