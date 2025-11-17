import { render, screen } from "@testing-library/react";
import { HotelDetails } from "./HotelDetails";
import type { Hotel } from "@/features/hotels/types";

const hotel: Hotel = {
  id: "hotel-1",
  name: "Seaside Retreat",
  city: "Barcelona",
  country: "Spain",
  rooms: 120,
  starRating: 4,
  occupancyRate: 0.87,
  revenueThisMonth: 124_500,
  guestProfiles: [
    {
      id: "g1",
      name: "Anna Müller",
      email: "anna@example.com",
      lifetimeValue: 9800,
      lastStay: "2025-09-12",
      segments: ["High LTV", "Direct Booker", "Loyalty"],
      city: "Munich",
      country: "Germany",
      channel: "Direct"
    }
  ]
};

describe("HotelDetails", () => {
  it("renders hotel summary and guest list", () => {
    render(
      <HotelDetails
        hotel={hotel}
        segmentFilter={null}
        onSegmentFilterChange={jest.fn()}
      />
    );
  
    expect(screen.getByText("Seaside Retreat")).toBeInTheDocument();
  
  
    expect(screen.getByText(/Barcelona/i)).toBeInTheDocument();
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();
  
    expect(screen.getByText("Anna Müller")).toBeInTheDocument();
  });

  it("renders empty state when hotel has no guests", () => {
    const emptyHotel = { ...hotel, guestProfiles: [] };
  
    render(
      <HotelDetails
        hotel={emptyHotel}
        segmentFilter={null}
        onSegmentFilterChange={jest.fn()}
      />
    );
  
    expect(
      screen.getByText(/No guests found for this hotel yet./i)
    ).toBeInTheDocument();
  });
  
});
