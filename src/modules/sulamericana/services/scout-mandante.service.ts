import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";
import { GlobalService } from "src/modules/shared/services/global.services";

@Injectable()
export class ScoutMandanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ScoutMandanteService.name);

  async execute(): Promise<Futebol.ScoutEquipe[]> {
    try {
      if (!this.globalService.campeonatoId) {
        throw new NotFoundException("Nenhum campeonato foi definido");
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException("Nenhuma partida foi definida");
      }

      if (!this.globalService.equipeMandanteId) {
        throw new NotFoundException("Nenhuma equipe mandante foi definida");
      }

      const filter: Futebol.OptionsPartida = {
        campeonatoId: this.globalService.campeonatoId,
        partidaId: this.globalService.partidaId,
        equipeId: this.globalService.equipeMandanteId,
      };

      return this.apiFutebolProvider.scoutEquipe(filter);
    } catch (error) {
      this.logger.error("Erro ao puxar scout Equipe Mandante");
      console.log(error);
      throw error;
    }
  }
}
