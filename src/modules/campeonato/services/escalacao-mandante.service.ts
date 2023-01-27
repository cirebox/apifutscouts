import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class EscalacaoMandanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(EscalacaoMandanteService.name);

  async execute(): Promise<Futebol.Escalacao[]> {
    try {
      return this.apiFutebolProvider.escalacao(this.globalService);
    } catch (error) {
      this.logger.error('Erro ao puxar escalação do mandante');
      console.log(error);
      throw error;
    }
  }
}
