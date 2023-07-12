import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class RodadaByIdService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(RodadaByIdService.name);

  async execute(rodadaId: number): Promise<Futebol.Partida[]> {
    try {
      if (!this.globalService.campeonatoId) {
        throw new NotFoundException('Nenhum campeonato foi definido');
      }

      if (!rodadaId) {
        throw new NotFoundException('Nenhuma rodada foi definida');
      }

      return this.apiFutebolProvider.rodadaById(rodadaId);
    } catch (error) {
      this.logger.error('Erro ao puxar rodada por id');
      console.log(error);
      throw error;
    }
  }
}
