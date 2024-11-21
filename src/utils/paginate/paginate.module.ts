import { Module } from '@nestjs/common';
import { PaginateService } from './paginate.service';
import { DatabaseModule } from 'src/plugins/database/database.module';

@Module({
  providers: [PaginateService],
  imports: [DatabaseModule],
})
export class PaginateModule {}
