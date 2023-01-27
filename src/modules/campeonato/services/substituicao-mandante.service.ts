import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class SubstituicaoMandanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(SubstituicaoMandanteService.name);

  async execute(): Promise<Futebol.Substituicao[]> {
    try {
      const filter: Futebol.OptionsPartida = {
        campeonatoId: this.globalService.campeonatoId,
        campeonato: this.globalService.campeonato,
        partidaId: this.globalService.partidaId,
        equipeId: this.globalService.equipeMandanteId,
        dirLogo: this.globalService.dirLogo,
      };
      return this.apiFutebolProvider.substituicao(filter);
    } catch (error) {
      this.logger.error('Erro ao puxar substituições equipe Visitante');
      console.log(error);
      throw error;
    }
  }
}
