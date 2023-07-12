import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';

@Injectable()
export class PartidasHojeService {
  constructor(
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(PartidasHojeService.name);

  async execute(): Promise<Futebol.Partida[]> {
    try {
      return this.apiFutebolProvider.partidasHoje();
    } catch (error) {
      this.logger.error('Erro ao puxar partidas de hoje');
      console.log(error);
      throw error;
    }
  }
}
