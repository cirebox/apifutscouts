import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class EquipeMandanteService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(EquipeMandanteService.name);

  async execute(): Promise<Futebol.Equipe> {
    try {
      return this.apiFutebolProvider.equipe(
        this.globalService.equipeMandanteId,
      );
    } catch (error) {
      this.logger.error(
        'Erro ao puxar equipe mandante',
        this.globalService.equipeMandanteId,
      );
      console.log(error);
      throw error;
    }
  }
}
