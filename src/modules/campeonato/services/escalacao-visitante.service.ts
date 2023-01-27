import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class EscalacaoVisitanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(EscalacaoVisitanteService.name);

  async execute(): Promise<Futebol.Escalacao[]> {
    try {
      return this.apiFutebolProvider.escalacao(this.globalService);
    } catch (error) {
      this.logger.error('Erro ao puxar escalação do visitante');
      console.log(error);
      throw error;
    }
  }
}
