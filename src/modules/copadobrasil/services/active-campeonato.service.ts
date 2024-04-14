import { PartidaService } from './partida.service';
import { GlobalService } from './../../shared/services/global.services';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { CampeonatosService } from './campeonatos.service';

@Injectable()
export class ActiveCampeonatoService {
  constructor(
    private readonly globalService: GlobalService,
    private readonly partidaService: PartidaService,
    private readonly campeonatosService: CampeonatosService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) { }

  private readonly logger = new Logger(ActiveCampeonatoService.name);

  async execute(
    campeonato: string,
    teste: string,
  ): Promise<Futebol.OptionsPartida> {
    try {
      if (!campeonato) {
        throw new NotFoundException('Nenhum campeonato foi definido');
      }

      this.globalService.clear();
      if (teste === 'true') {
        campeonato = 'carioca';
        this.globalService.campeonatoId = 943;
        this.globalService.campeonato = 'Carioca 2024';
        this.globalService.campeonatoSlug = campeonato;
        this.globalService.dirLogo =
          process.env.DIR_LOGO + this.globalService.campeonatoSlug + '/';
        this.globalService.partidaId = 211924;
        this.globalService.equipeMandanteId = 1005;
        this.globalService.equipeVisitanteId = 2346;
        this.globalService.equipeId = 1005;
        this.globalService.rodadaId = 1;

        this.globalService.mandanteAtletas =
          await this.apiFutebolProvider.equipeAtletas(
            this.globalService.equipeMandanteId,
          );

        this.globalService.visitanteAtletas =
          await this.apiFutebolProvider.equipeAtletas(
            this.globalService.equipeVisitanteId,
          );

        return this.globalService;
      } else {
        this.globalService.campeonatoSlug = campeonato.toLocaleLowerCase();
        await this.campeonatosService.execute(campeonato.toLocaleLowerCase());
        this.globalService.dirLogo =
          process.env.DIR_LOGO + this.globalService.campeonatoSlug + '/';
        this.globalService.equipeId = parseInt(process.env.EQUIPE_DEFAULT_ID);

        await this.partidaService.execute();

        if (this.globalService.partidaId) {
          this.globalService.mandanteAtletas =
            await this.apiFutebolProvider.equipeAtletas(
              this.globalService.equipeMandanteId,
            );

          this.globalService.visitanteAtletas =
            await this.apiFutebolProvider.equipeAtletas(
              this.globalService.equipeVisitanteId,
            );
        }

        return this.globalService;
      }
    } catch (error) {
      this.logger.error('Erro ao definir campeonato');
      console.log(error);
      throw error;
    }
  }
}
