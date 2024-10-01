import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";
import { GlobalService } from "src/modules/shared/services/global.services";

@Injectable()
export class HeatmapMadanteJsonService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(HeatmapMadanteJsonService.name);

  async execute(): Promise<Futebol.Heatmap[]> {
    try {
      if (!this.globalService.equipeMandanteId) {
        throw new NotFoundException("Nenhum equipe mandante foi definido");
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException("Nenhuma partida foi definida");
      }

      return this.apiFutebolProvider.heatmap(
        this.globalService.equipeMandanteId,
      );
    } catch (error) {
      this.logger.error("Erro ao puxar heatmap mandante");
      console.log(error);
      throw error;
    }
  }
}
