import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const hotels = await this.prisma.hotel.findMany({
      include: { guests: true },
      orderBy: { name: 'asc' },
    });

    return hotels.map((h) => ({
      id: h.id,
      name: h.name,
      city: h.city,
      country: h.country,
      rooms: h.rooms,
      starRating: h.starRating,
      occupancyRate: h.occupancyRate,
      revenueThisMonth: h.revenueThisMonth,
      guestCount: h.guests.length,
    }));
  }

  async findOne(id: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id },
      include: { guests: true },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel ${id} not found`);
    }

    return {
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      occupancyRate: hotel.occupancyRate,
      revenueThisMonth: hotel.revenueThisMonth,
      guests: hotel.guests.map((g) => ({
        id: g.id,
        fullName: `${g.firstName} ${g.lastName}`,
        email: g.email,
        country: g.country,
        city: g.city,
        lifetimeValue: g.lifetimeValue,
        lastStay: g.lastStay,
        channel: g.channel,
        segments: g.segments,
      })),
    };
  }
}
