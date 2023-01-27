import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class CampeonatosService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(CampeonatosService.name);

  async execute(campeonatoAtivoSlug?: string): Promise<Futebol.Campeonato[]> {
    try {
      const campeonatos = await this.apiFutebolProvider.campeonatos();

      const year = new Date().getFullYear();
      this.logger.debug(`Ano => ${year}`);

      if (campeonatoAtivoSlug) {
        const retorno = await campeonatos.filter(
          (value) =>
            value.slug
              .toLowerCase()
              .includes(campeonatoAtivoSlug.toLowerCase()) &&
            value.ativo === true &&
            value.temporada == year,
        )[0];

        if (!retorno) {
          throw new NotFoundException(
            'Não foi possível definar a competição ou competição indisponivel',
          );
        }

        this.globalService.campeonatoId = retorno.id;
        this.globalService.campeonato = retorno.nome;
        this.globalService.campeonatoSlug = campeonatoAtivoSlug.toLowerCase();
        this.globalService.rodadaId = retorno.rodadaAtual;
      }

      const retorno = campeonatos.filter(
        (value) => value.ativo === true && value.temporada == year,
      );

      return retorno;
    } catch (error) {
      this.logger.error(
        'Erro ao puxar campeonatos ou definir campeonato ativo',
      );
      console.log(error);
      throw error;
    }
  }
}
