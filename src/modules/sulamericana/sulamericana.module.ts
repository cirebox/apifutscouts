import { Module } from '@nestjs/common';
import { HttpController } from './controllers/http.controller';
import { CampeonatoModule } from '../campeonato/campeonato.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule, CampeonatoModule],
  controllers: [HttpController],
})
export class SulamericanaModule {}
