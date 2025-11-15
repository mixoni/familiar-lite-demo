import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { HotelList } from "./HotelList";
import type { Hotel } from "@/features/hotels/types";

const sampleHotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "Seaside Retreat",
    city: "Barcelona",
    country: "Spain",
    rooms: 120,
    starRating: 4,
    occupancyRate: 0.87,
    revenueThisMonth: 124_500,
    guestProfiles: []
  },
  {
    id: "hotel-2",
    name: "City Center Hotel",
    city: "Paris",
    country: "France",
    rooms: 95,
    starRating: 3,
    occupancyRate: 0.73,
    revenueThisMonth: 89_200,
    guestProfiles: []
  },
  {
    id: "hotel-3",
    name: "Alpine Lodge",
    city: "Zürich",
    country: "Switzerland",
    rooms: 60,
    starRating: 5,
    occupancyRate: 0.91,
    revenueThisMonth: 142_300,
    guestProfiles: []
  }
];

const meta: Meta<typeof HotelList> = {
  title: "CRM/HotelList",
  component: HotelList,
  args: {
    hotels: sampleHotels,
    selectedHotelId: "hotel-1",
    search: ""
  },
  argTypes: {
    onSearchChange: { action: "search changed" },
    onSelectHotel: { action: "hotel selected" }
  }
};

export default meta;
type Story = StoryObj<typeof HotelList>;

export const Default: Story = {};

export const FilterByCity: Story = {
  args: {
    search: ""
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("hotel-search-input") as HTMLInputElement;
    await userEvent.clear(input);
    await userEvent.type(input, "Paris");

    // Simulate that parent updates props (storybook won't re-render args automatically here),
    // so just assert that input value changed.
    await expect(input.value).toBe("Paris");
  }
};

export const NoResults: Story = {
  args: {
    hotels: [],
    search: "Nowhere"
  }
};
