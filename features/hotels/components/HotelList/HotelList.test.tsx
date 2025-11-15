import { render, screen, fireEvent } from "@testing-library/react";
import { HotelList } from "./HotelList";
import type { Hotel } from "@/features/hotels/types";

const hotels: Hotel[] = [
  {
    id: "h1",
    name: "Hotel One",
    city: "Berlin",
    country: "Germany",
    rooms: 100,
    starRating: 4,
    occupancyRate: 0.8,
    revenueThisMonth: 100_000,
    guestProfiles: []
  },
  {
    id: "h2",
    name: "Hotel Two",
    city: "Paris",
    country: "France",
    rooms: 80,
    starRating: 3,
    occupancyRate: 0.7,
    revenueThisMonth: 80_000,
    guestProfiles: []
  }
];

describe("HotelList", () => {
  it("renders hotels and highlights selected", () => {
    render(
      <HotelList
        hotels={hotels}
        selectedHotelId="h1"
        search=""
        onSearchChange={() => {}}
        onSelectHotel={() => {}}
      />
    );

    expect(screen.getByText("Hotel One")).toBeInTheDocument();
    expect(screen.getByText("Hotel Two")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing in search box", () => {
    const onSearchChange = jest.fn();
    render(
      <HotelList
        hotels={hotels}
        selectedHotelId={null}
        search=""
        onSearchChange={onSearchChange}
        onSelectHotel={() => {}}
      />
    );

    const input = screen.getByTestId("hotel-search-input");
    fireEvent.change(input, { target: { value: "berlin" } });

    expect(onSearchChange).toHaveBeenCalledWith("berlin");
  });
});
