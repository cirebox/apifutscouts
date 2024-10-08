import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";

@Injectable()
export class EquipeByIdService {
  constructor(
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(EquipeByIdService.name);

  async execute(equipeId: number): Promise<Futebol.Equipe> {
    try {
      if (!equipeId) {
        throw new NotFoundException("Nenhuma equipe foi definida");
      }

      return this.apiFutebolProvider.equipe(equipeId);
    } catch (error) {
      this.logger.error("Erro ao puxar equipe por id", equipeId);
      console.log(error);
      throw error;
    }
  }
}
