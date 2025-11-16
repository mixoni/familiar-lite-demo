import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.guest.deleteMany();
  await prisma.hotel.deleteMany();

  await prisma.hotel.createMany({
    data: [
      {
        id: 'h1',
        name: 'Seaside Retreat',
        city: 'Barcelona',
        country: 'Spain',
        rooms: 120,
        starRating: 4,
        occupancyRate: 0.87,
        revenueThisMonth: 124500,
      },
      {
        id: 'h2',
        name: 'City Center Hotel',
        city: 'Paris',
        country: 'France',
        rooms: 80,
        starRating: 5,
        occupancyRate: 0.73,
        revenueThisMonth: 89200,
      },
    ],
  });

  await prisma.guest.createMany({
    data: [
      {
        id: 'g1',
        hotelId: 'h1',
        firstName: 'Anna',
        lastName: 'Müller',
        email: 'anna.mueller@example.com',
        country: 'Germany',
        city: 'Berlin',
        lifetimeValue: 9800,
        lastStay: new Date('2025-09-12'),
        channel: 'Direct',
        segments: ['High LTV', 'Direct Booker', 'Loyalty'],
      },
      {
        id: 'g2',
        hotelId: 'h1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        country: 'UK',
        city: 'London',
        lifetimeValue: 2100,
        lastStay: new Date('2025-10-01'),
        channel: 'OTA',
        segments: ['OTA', 'Upsell candidate'],
      },
      {
        id: 'g3',
        hotelId: 'h2',
        firstName: 'Claire',
        lastName: 'Dubois',
        email: 'claire.dubois@example.com',
        country: 'France',
        city: 'Lyon',
        lifetimeValue: 4200,
        lastStay: new Date('2025-10-05'),
        channel: 'Direct',
        segments: ['High LTV', 'Loyalty'],
      },
    ],
  });

  console.log('Seed completed ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
