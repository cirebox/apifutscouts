import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";
import { GlobalService } from "src/modules/shared/services/global.services";
import { ClassificacaoService } from "./classificacao.service";

@Injectable()
export class ClassificacaoByGrupoService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ClassificacaoService.name);

  async execute(grupoId: string): Promise<Futebol.Classificacao[]> {
    try {
      if (!grupoId) {
        throw new NotFoundException("Nenhum grupo foi definido");
      }

      if (!this.globalService.campeonatoId) {
        throw new NotFoundException("Nenhum campeonato foi definido");
      }

      return this.apiFutebolProvider.classificacaoByGrupo(grupoId);
    } catch (error) {
      this.logger.error("Erro ao puxar classificação");
      console.log(error);
      throw error;
    }
  }
}
