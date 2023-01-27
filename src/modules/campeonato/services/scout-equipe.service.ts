import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class ScoutEquipeService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ScoutEquipeService.name);

  async execute(equipeId: number): Promise<Futebol.ScoutEquipe[]> {
    try {
      const filter: Futebol.OptionsPartida = {
        campeonatoId: this.globalService.campeonatoId,
        campeonato: this.globalService.campeonato,
        partidaId: this.globalService.partidaId,
        equipeId: equipeId,
        dirLogo: this.globalService.dirLogo,
      };

      return this.apiFutebolProvider.scoutEquipe(filter);
    } catch (error) {
      this.logger.error('Erro ao puxar scout da equipe por id');
      console.log(error);
      throw error;
    }
  }
}
