import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class MensagensService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(MensagensService.name);

  async execute(): Promise<Futebol.Mensagem[]> {
    try {
      return this.apiFutebolProvider.mensagens(this.globalService);
    } catch (error) {
      this.logger.error('Erro ao puxar mensagens da partida');
      console.log(error);
      throw error;
    }
  }
}
