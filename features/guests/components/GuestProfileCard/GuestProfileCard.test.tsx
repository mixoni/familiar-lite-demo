import { render, screen } from "@testing-library/react";
import { GuestProfileCard } from "./GuestProfileCard";
import type { GuestProfile } from "@/features/guests/types";

const guest: GuestProfile = {
  id: "test-guest",
  name: "Test Guest",
  email: "test@example.com",
  lifetimeValue: 3000,
  lastStay: "2025-09-30",
  segments: ["High LTV", "Direct Booker"],
  city: "Belgrade",
  country: "Serbia",
  channel: "Direct"
};

describe("GuestProfileCard", () => {
  it("renders guest name, email and LTV", () => {
    render(<GuestProfileCard guest={guest} />);

    expect(screen.getByText("Test Guest")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText(/LTV/)).toBeInTheDocument();
  });

  it("renders all segments as badges", () => {
    render(<GuestProfileCard guest={guest} />);

    expect(screen.getByText("High LTV")).toBeInTheDocument();
    expect(screen.getByText("Direct Booker")).toBeInTheDocument();
  });
});
