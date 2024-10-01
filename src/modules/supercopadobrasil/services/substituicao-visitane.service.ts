import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";
import { GlobalService } from "src/modules/shared/services/global.services";

@Injectable()
export class SubstituicaoVisitaneService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(SubstituicaoVisitaneService.name);

  async execute(): Promise<Futebol.Substituicao[]> {
    try {
      if (!this.globalService.campeonatoId) {
        throw new NotFoundException("Nenhum campeonato foi definido");
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException("Nenhuma partida foi definida");
      }

      if (!this.globalService.equipeVisitanteId) {
        throw new NotFoundException("Nenhuma equipe visitante foi definida");
      }

      const filter: Futebol.OptionsPartida = {
        campeonatoId: this.globalService.campeonatoId,
        partidaId: this.globalService.partidaId,
        equipeId: this.globalService.equipeVisitanteId,
      };

      return this.apiFutebolProvider.substituicao(filter);
    } catch (error) {
      this.logger.error("Erro ao puxar substituições equipe Visitante");
      console.log(error);
      throw error;
    }
  }
}
