import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { HotelDetails } from "./HotelDetails";
import type { Hotel } from "@/features/hotels/types";

const sampleHotel: Hotel = {
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
    },
    {
      id: "g2",
      name: "John Smith",
      email: "john@example.com",
      lifetimeValue: 2100,
      lastStay: "2025-10-01",
      segments: ["OTA", "Upsell candidate"],
      city: "London",
      country: "United Kingdom",
      channel: "OTA"
    }
  ]
};

const meta: Meta<typeof HotelDetails> = {
  title: "CRM/HotelDetails",
  component: HotelDetails,
  args: {
    hotel: sampleHotel,
    segmentFilter: null
  },
  argTypes: {
    onSegmentFilterChange: { action: "segment filter changed" }
  }
};

export default meta;
type Story = StoryObj<typeof HotelDetails>;

export const Default: Story = {};

export const FilterHighLTV: Story = {
  args: {
    segmentFilter: null
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId("segment-chip-High LTV");
    await userEvent.click(chip);
    await expect(canvas.getByText("Anna Müller")).toBeInTheDocument();
  }
};

export const NoHotelSelected: Story = {
  args: {
    hotel: null
  }
};
