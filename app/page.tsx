import { HotelDashboard } from "@/features/hotels/components/HotelDashboard/HotelDashboard";
import { mockHotels } from "@/features/hotels/mockData";

export default function HomePage() {
  return <HotelDashboard initialHotels={mockHotels} />;
}
