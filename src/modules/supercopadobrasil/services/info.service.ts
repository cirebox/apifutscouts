import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAPIFutebolProvider } from 'src/modules/shared/providers/interfaces/iapifutebol-provider';
import { GlobalService } from 'src/modules/shared/services/global.services';

@Injectable()
export class InfoService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject('IAPIFutebolProvider')
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) {}

  private readonly logger = new Logger(InfoService.name);

  async execute(): Promise<Futebol.Info> {
    try {
      const data = await new Date();
      const hora = await data.getTime();
      return {
        hora: hora,
        campeonatoId: this.globalService.campeonatoId,
        campeonato: this.globalService.campeonato,
        campeonatoSlug: this.globalService.campeonatoSlug,
        rodadaId: this.globalService.rodadaId,
        equipeDefault: process.env.EQUIPE_DEFAULT_ID,
        partidaId: this.globalService.partidaId,
        mandanteId: this.globalService.equipeMandanteId,
        visitanteId: this.globalService.equipeVisitanteId,
        dirLogo: this.globalService.dirLogo,
        optionsCampeonato: process.env.URL_API + 'options',
        activeCampeonato: process.env.URL_API + 'active/:campeonato',
        info: process.env.URL_API + 'info',
        partida: process.env.URL_API + 'partida',
        partidasDeHoje: process.env.URL_API + 'partida/hoje',
        classificacao: process.env.URL_API + 'classificacao',
        equipeById: process.env.URL_API + 'equipe/id/:equipeId',
        equipeMandante: process.env.URL_API + 'equipe/mandante',
        equipeVisitante: process.env.URL_API + 'equipe/visitante',
        artilharia: process.env.URL_API + 'artilharia/',
        rodadaPorId: process.env.URL_API + 'rodada/:id',
        visitanteEscalacao: process.env.URL_API + 'escalacao/visitante/',
        MandanteEscalacao: process.env.URL_API + 'escalacao/mandante/',
        visitanteSubstituicao: process.env.URL_API + 'substituicao/visitante/',
        MandanteSubstituicao: process.env.URL_API + 'substituicao/mandante/',
        scoutTimeVisitante: process.env.URL_API + 'scout/visitante/',
        scoutTimeMadante: process.env.URL_API + 'scout/mandante/',
        scoutJogadorVisitantePorId:
          process.env.URL_API + 'scout/visitante/atleta/:id/', // testado média de 15s para retornar
        scoutJogadorMadantePorId:
          process.env.URL_API + 'scout/mandante/atleta/:id/', // testado média de 15s para retornar
        mapaDeCalorVisitante: process.env.URL_API + 'heatmap/visitantejson/', // não esta funcionando
        mapaDeCalorMandante: process.env.URL_API + 'heatmap/mandantejson/', // não esta funcionando
        mapaDeCalorJogadorPorId: process.env.URL_API + 'heatmap/atleta/:id', // não esta funcionando
        // scoutJogador: process.env.URL_API + 'scout/jogador',
      } as Futebol.Info;
    } catch (error) {
      this.logger.error('Erro ao puxar info endpoint');
      console.log(error);
      throw error;
    }
  }
}
