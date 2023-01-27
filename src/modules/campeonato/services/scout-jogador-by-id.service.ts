import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';

@Injectable()
export class ScoutJogadorByIdService {
  constructor(
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ScoutJogadorByIdService.name);

  async execute(jogadorId: number): Promise<Futebol.ScoutJogador[]> {
    try {
      return this.apiFutebolProvider.scoutAtleta(jogadorId);
    } catch (error) {
      this.logger.error('Erro ao puxar scout jogador by id', jogadorId);
      console.log(error);
      throw error;
    }
  }
}
