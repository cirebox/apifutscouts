import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class ScoutJogadorByIdService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ScoutJogadorByIdService.name);

  async execute(jogadorId: number): Promise<Futebol.ScoutJogador[]> {
    try {
      if (!this.globalService.campeonatoId) {
        throw new NotFoundException('Nenhum campeonato foi definido');
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException('Nenhuma partida foi definida');
      }

      return this.apiFutebolProvider.scoutAtleta(jogadorId);
    } catch (error) {
      this.logger.error('Erro ao puxar scout jogador by id', jogadorId);
      console.log(error);
      throw error;
    }
  }
}
