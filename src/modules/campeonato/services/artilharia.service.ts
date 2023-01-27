import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class ArtilhariaService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(ArtilhariaService.name);

  async execute(): Promise<Futebol.Artilharia[]> {
    try {
      return this.apiFutebolProvider.artilharia(this.globalService);
    } catch (error) {
      this.logger.error('Erro ao puxar artilharia');
      console.log(error);
      throw error;
    }
  }
}
