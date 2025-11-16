import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [PrismaModule, HotelsModule],
})
export class AppModule {}
