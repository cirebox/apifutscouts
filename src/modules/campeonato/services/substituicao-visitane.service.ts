import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class SubstituicaoVisitaneService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(SubstituicaoVisitaneService.name);

  async execute(): Promise<Futebol.Substituicao[]> {
    try {
      return this.apiFutebolProvider.substituicao(this.globalService);
    } catch (error) {
      this.logger.error('Erro ao puxar substituições equipe Visitante');
      console.log(error);
      throw error;
    }
  }
}
