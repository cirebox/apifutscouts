import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";
import { GlobalService } from "src/modules/shared/services/global.services";

@Injectable()
export class RodadaByGroupService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(RodadaByGroupService.name);

  async execute(rodadaId: number, group: string): Promise<Futebol.Partida[]> {
    try {
      if (!this.globalService.campeonatoId) {
        throw new NotFoundException("Nenhum campeonato foi definido");
      }

      if (!rodadaId) {
        throw new NotFoundException("Nenhuma rodada foi definida");
      }

      if (!group) {
        throw new NotFoundException("Nenhum grupo foi definido");
      }

      return this.apiFutebolProvider.rodadaByGroup(rodadaId, group);
    } catch (error) {
      this.logger.error("Erro ao puxar rodada por id");
      console.log(error);
      throw error;
    }
  }
}
