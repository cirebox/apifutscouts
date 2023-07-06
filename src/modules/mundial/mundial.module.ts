import { Module } from '@nestjs/common';
import { HttpController } from './controllers/http.controller';
import { SharedModule } from '../shared/shared.module';
import { CampeonatoModule } from '../campeonato/campeonato.module';

@Module({
  imports: [SharedModule, CampeonatoModule],
  controllers: [HttpController],
})
export class MundialModule {}
