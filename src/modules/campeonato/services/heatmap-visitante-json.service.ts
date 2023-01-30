import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class HeatmapVisitanteJsonService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(HeatmapVisitanteJsonService.name);

  async execute(): Promise<Futebol.Heatmap[]> {
    try {
      if (!this.globalService.equipeVisitanteId) {
        throw new NotFoundException('Nenhum equipe visitante foi definido');
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException('Nenhuma partida foi definida');
      }

      return this.apiFutebolProvider.heatmap(
        this.globalService.equipeVisitanteId,
      );
    } catch (error) {
      this.logger.error('Erro ao puxar heatmap visitante');
      console.log(error);
      throw error;
    }
  }
}
