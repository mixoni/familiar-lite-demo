// api/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsController } from 'hotels/hotels.controller';
import { HotelsService } from 'hotels/hotels.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, HotelsController],
  providers: [AppService, HotelsService, PrismaService],
})
export class AppModule {}
