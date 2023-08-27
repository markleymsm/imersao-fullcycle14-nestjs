import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MapsModule } from '../maps/maps.module';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesGateway } from './routes/routes.gateway';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [MapsModule, BullModule.registerQueue({ name: 'new-points' })],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesDriverService, RoutesGateway],
})
export class RoutesModule {}
