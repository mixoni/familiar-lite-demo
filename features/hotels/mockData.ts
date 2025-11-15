import type { Hotel } from "./types";

export const mockHotels: Hotel[] = [
  {
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
        id: "guest-1",
        name: "Anna Müller",
        email: "anna.mueller@example.com",
        lifetimeValue: 9800,
        lastStay: "2025-09-12",
        segments: ["High LTV", "Direct Booker", "Loyalty"],
        city: "Munich",
        country: "Germany",
        channel: "Direct"
      },
      {
        id: "guest-2",
        name: "John Smith",
        email: "john.smith@example.com",
        lifetimeValue: 2100,
        lastStay: "2025-10-01",
        segments: ["OTA", "Upsell candidate"],
        city: "London",
        country: "United Kingdom",
        channel: "OTA"
      },
      {
        id: "guest-3",
        name: "Lucia Rossi",
        email: "lucia.rossi@example.com",
        lifetimeValue: 4300,
        lastStay: "2025-08-21",
        segments: ["Loyalty"],
        city: "Milan",
        country: "Italy",
        channel: "Direct"
      }
    ]
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
    guestProfiles: [
      {
        id: "guest-4",
        name: "Luc Dubois",
        email: "luc.dubois@example.com",
        lifetimeValue: 5600,
        lastStay: "2025-08-21",
        segments: ["Corporate", "High LTV"],
        city: "Lyon",
        country: "France",
        channel: "Corporate"
      },
      {
        id: "guest-5",
        name: "Emma Johansson",
        email: "emma.j@example.com",
        lifetimeValue: 3200,
        lastStay: "2025-09-05",
        segments: ["OTA"],
        city: "Stockholm",
        country: "Sweden",
        channel: "OTA"
      }
    ]
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
    guestProfiles: [
      {
        id: "guest-6",
        name: "Markus Steiner",
        email: "markus.steiner@example.com",
        lifetimeValue: 12_200,
        lastStay: "2025-10-10",
        segments: ["High LTV", "Direct Booker"],
        city: "Vienna",
        country: "Austria",
        channel: "Direct"
      },
      {
        id: "guest-7",
        name: "Sofia Petrova",
        email: "sofia.p@example.com",
        lifetimeValue: 4100,
        lastStay: "2025-07-18",
        segments: ["Loyalty"],
        city: "Sofia",
        country: "Bulgaria",
        channel: "Agency"
      },
      {
        id: "guest-8",
        name: "Alex Chen",
        email: "alex.chen@example.com",
        lifetimeValue: 2600,
        lastStay: "2025-09-25",
        segments: ["OTA", "Upsell candidate"],
        city: "Shanghai",
        country: "China",
        channel: "OTA"
      }
    ]
  },
  {
    id: "hotel-4",
    name: "Harbour View Suites",
    city: "Copenhagen",
    country: "Denmark",
    rooms: 80,
    starRating: 4,
    occupancyRate: 0.69,
    revenueThisMonth: 76_400,
    guestProfiles: [
      {
        id: "guest-9",
        name: "Lars Nielsen",
        email: "lars.n@example.com",
        lifetimeValue: 3900,
        lastStay: "2025-06-30",
        segments: ["Corporate"],
        city: "Copenhagen",
        country: "Denmark",
        channel: "Corporate"
      },
      {
        id: "guest-10",
        name: "Priya Patel",
        email: "priya.p@example.com",
        lifetimeValue: 2200,
        lastStay: "2025-05-12",
        segments: ["OTA"],
        city: "Mumbai",
        country: "India",
        channel: "OTA"
      }
    ]
  },
  {
    id: "hotel-5",
    name: "Desert Sun Resort",
    city: "Dubai",
    country: "UAE",
    rooms: 200,
    starRating: 5,
    occupancyRate: 0.81,
    revenueThisMonth: 215_900,
    guestProfiles: [
      {
        id: "guest-11",
        name: "Ahmed Al-Sayed",
        email: "ahmed.a@example.com",
        lifetimeValue: 14_500,
        lastStay: "2025-09-01",
        segments: ["High LTV", "Loyalty"],
        city: "Riyadh",
        country: "Saudi Arabia",
        channel: "Direct"
      },
      {
        id: "guest-12",
        name: "Chen Wei",
        email: "chen.wei@example.com",
        lifetimeValue: 3800,
        lastStay: "2025-10-03",
        segments: ["OTA", "Upsell candidate"],
        city: "Beijing",
        country: "China",
        channel: "OTA"
      },
      {
        id: "guest-13",
        name: "Olivia Brown",
        email: "olivia.b@example.com",
        lifetimeValue: 5400,
        lastStay: "2025-07-22",
        segments: ["Corporate", "High LTV"],
        city: "New York",
        country: "USA",
        channel: "Corporate"
      }
    ]
  }
];
