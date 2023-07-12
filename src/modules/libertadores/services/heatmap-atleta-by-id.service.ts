import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class HeatmapAtletaByIdService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(HeatmapAtletaByIdService.name);

  async execute(jogadorId: number): Promise<Futebol.Heatmap[]> {
    try {
      if (!this.globalService.atletaId) {
        throw new NotFoundException('Nenhum jogador foi definido');
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException('Nenhuma partida foi definida');
      }

      this.globalService.atletaId = jogadorId;
      return this.apiFutebolProvider.heatmapJodador(jogadorId);
    } catch (error) {
      this.logger.error('Erro ao puxar heatmap por jogador');
      console.log(error);
      throw error;
    }
  }
}
