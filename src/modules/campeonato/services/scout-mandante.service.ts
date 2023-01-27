import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class ScoutMandanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ScoutMandanteService.name);

  async execute(): Promise<Futebol.ScoutEquipe[]> {
    try {
      return this.apiFutebolProvider.scoutEquipe(this.globalService);
    } catch (error) {
      this.logger.error('Erro ao puxar scout Equipe Mandante');
      console.log(error);
      throw error;
    }
  }
}
