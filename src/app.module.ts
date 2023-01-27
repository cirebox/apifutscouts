import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampeonatoModule } from './modules/campeonato/campeonato.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [CampeonatoModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
