import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class PartidaService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(PartidaService.name);

  async execute(): Promise<Futebol.Partida[]> {
    try {
      const retorno = [];
      const response = await this.apiFutebolProvider.partidasHoje();

      await Promise.all(
        response.map(async (obj) => {
          if (
            obj.mandanteId === parseInt(process.env.EQUIPE_DEFAULT_ID) ||
            obj.visitanteId === parseInt(process.env.EQUIPE_DEFAULT_ID)
          ) {
            if (obj.partidaId > 0) {
              const partida: Futebol.Partida =
                await this.apiFutebolProvider.partida(obj.partidaId);

              this.globalService.partidaId = partida.partidaId;
              this.globalService.rodadaId = partida.rodadaId;
              this.globalService.equipeMandanteId = partida.mandanteId;
              this.globalService.equipeVisitanteId = partida.visitanteId;

              retorno.push(partida);
            }
          }
        }),
      );

      if (!retorno || retorno.length === 0) {
        throw new NotFoundException(
          'Não foi possível definir partida ou partida não foi iniciada',
        );
      }

      return retorno;
    } catch (error) {
      this.logger.error('Erro ao puxar partidas de hoje');
      console.log(error);
      throw error;
    }
  }
}
