import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampeonatoModule } from './modules/campeonato/campeonato.module';
import { SharedModule } from './modules/shared/shared.module';
import { BrasileiroModule } from './modules/brasileiro/brasileiro.module';
import { CariocaModule } from './modules/carioca/carioca.module';
import { LibertadoresModule } from './modules/libertadores/libertadores.module';
import { CopadobrasilModule } from './modules/copadobrasil/copadobrasil.module';
import { MundialModule } from './modules/mundial/mundial.module';
import { RecopaModule } from './modules/recopa/recopa.module';
import { SulamericanaModule } from './modules/sulamericana/sulamericana.module';
import { SupercopadobrasilModule } from './modules/supercopadobrasil/supercopadobrasil.module';

@Module({
  imports: [
    CampeonatoModule,
    SharedModule,
    BrasileiroModule,
    CariocaModule,
    LibertadoresModule,
    CopadobrasilModule,
    MundialModule,
    RecopaModule,
    SulamericanaModule,
    SupercopadobrasilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
