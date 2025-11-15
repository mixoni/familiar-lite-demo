export type GuestProfile = {
  id: string;
  name: string;
  email: string;
  lifetimeValue: number;
  lastStay: string;
  segments: string[];
  city?: string;
  country?: string;
  channel?: "Direct" | "OTA" | "Corporate" | "Agency";
};
