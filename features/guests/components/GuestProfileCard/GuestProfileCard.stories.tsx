import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { GuestProfileCard } from "./GuestProfileCard";
import type { GuestProfile } from "@/features/guests/types";

const baseGuest: GuestProfile = {
  id: "guest-demo",
  name: "Demo Guest",
  email: "demo.guest@example.com",
  lifetimeValue: 4200,
  lastStay: "2025-10-01",
  segments: ["High LTV", "Direct Booker"],
  city: "Berlin",
  country: "Germany",
  channel: "Direct"
};

const meta: Meta<typeof GuestProfileCard> = {
  title: "CRM/GuestProfileCard",
  component: GuestProfileCard,
  args: {
    guest: baseGuest
  }
};

export default meta;
type Story = StoryObj<typeof GuestProfileCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Demo Guest")).toBeInTheDocument();
    await expect(canvas.getByText("demo.guest@example.com")).toBeInTheDocument();
  }
};

export const OTAGuest: Story = {
  args: {
    guest: {
      ...baseGuest,
      name: "OTA Guest",
      email: "ota.guest@example.com",
      segments: ["OTA", "Upsell candidate"],
      channel: "OTA"
    }
  }
};
