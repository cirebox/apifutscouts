import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class EquipeVisitanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(EquipeVisitanteService.name);

  async execute(): Promise<Futebol.Equipe> {
    try {
      if (!this.globalService.equipeVisitanteId) {
        throw new NotFoundException('Nenhuma equipe visitante foi definida');
      }

      return this.apiFutebolProvider.equipe(
        this.globalService.equipeVisitanteId,
      );
    } catch (error) {
      this.logger.error(
        'Erro ao puxar equipe visitante',
        this.globalService.equipeVisitanteId,
      );
      console.log(error);
      throw error;
    }
  }
}
