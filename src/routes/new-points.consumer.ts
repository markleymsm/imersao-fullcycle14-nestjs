import { Job } from 'bull';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { Process, Processor } from '@nestjs/bull';

@Processor('new-points')
export class NewPointsConsumer {
  constructor(private routesDriverService: RoutesDriverService) {}

  @Process()
  async handle(job: Job<{ route_id: string; lat: number; lng: number }>) {
    await this.routesDriverService.createOrUpdate(job.data);
  }
}
