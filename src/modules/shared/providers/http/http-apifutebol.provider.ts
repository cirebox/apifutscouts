import { Agent } from 'https';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { config } from 'dotenv';
import { NestResponseBuilder } from '../../../../core/http/nest-response-builder';
import { IAPIFutebolProvider } from '../interfaces/iapifutebol-provider';
import { NestResponseException } from 'src/core/http/nest-response-exception';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from '../../services/global.services';

config();

@Injectable()
export class APIFutebolProvider implements IAPIFutebolProvider, OnModuleInit {
  private apiFutebolV1Url;
  private apiFutebolV2Url;
  private token;

  constructor(
    private readonly globalService: GlobalService,
    private readonly httpService: HttpService,
    private readonly nestResponseBuilder: NestResponseBuilder,
  ) {}

  async onModuleInit() {
    this.token = process.env.TOKEN;
    this.apiFutebolV1Url = 'http://apifutebol.footstats.com.br/3.1';
    this.apiFutebolV2Url = 'https://vmix.footstats.com.br/api/v1';
    const httpsAgent = new Agent({
      rejectUnauthorized: false,
    });

    this.httpService.axiosRef.defaults.httpsAgent = httpsAgent;
  }

  private readonly logger = new Logger(APIFutebolProvider.name);

  async campeonatos(): Promise<Futebol.Campeonato[]> {
    this.logger.debug('campeonatos');

    try {
      const url = `${this.apiFutebolV1Url}/campeonatos`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      await Promise.all(
        response.data.data.map(async (obj) => {
          const campeonato: Futebol.Campeonato = {
            id: obj.id,
            nome: obj.nome,
            apelido: obj.apelido,
            slug: obj.sdeSlug,
            urlLogo: obj.urlLogo,
            categoria: obj.categoria,
            temporada: obj.temporada,
            temClassificacao: obj.temClassificacao,
            temClassificacaoPorGrupo: obj.temClassificacaoPorGrupo,
            quantidadeDeEquipes: obj.quantidadeDeEquipes,
            rodadaAtual: obj.rodadaAtual,
            quantidadeDeRodadas: obj.quantidadeDeRodadas,
            ativo: obj.ativo,
          };

          retorno.push(campeonato);
        }),
      );

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando campeonatos');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async partida(partidaId: number): Promise<Futebol.Partida> {
    this.logger.debug('partida Id: ', partidaId);

    try {
      const url = `${this.apiFutebolV1Url}/partidas/${partidaId}`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const golMandante = response.data.data.placar.golsMandante ?? ' ';
      const golsVisitante = response.data.data.placar.golsVisitante ?? ' ';
      const partida: Futebol.Partida = {
        partidaId: response.data.data.id,
        rodadaId: response.data.data.rodada,
        rodada: response.data.data.rodada + 'ª RODADA',
        campeonato: response.data.data.nomeDaTaca,
        campeonato_nome_popular: response.data.data.nomeDaTaca,
        faseAtual: response.data.data.fase,
        grupo: response.data.data.grupo,
        placar:
          response.data.data.periodoJogo == 'Não Inic.' ||
          response.data.data.dataDaPartidaIso == null
            ? golMandante + 'x' + golsVisitante
            : golMandante + ' x ' + golsVisitante,
        mandanteId: response.data.data.idEquipeMandante,
        visitanteId: response.data.data.idEquipeVisitante,
        mandante: response.data.data.idEquipeMandante,
        visitante: response.data.data.idEquipeVisitante,
        logoMandante:
          this.globalService.dirLogo + response.data.data.idEquipeMandante,
        logoVisitante:
          this.globalService.dirLogo + response.data.data.idEquipeVisitante,
        golsMandante: response.data.data.placar.golsMandante ?? 0,
        golsVisitante: response.data.data.placar.golsVisitante ?? 0,
        status: response.data.data.status ?? '',
        estadio: response.data.data.estadio ?? '',

        periodo:
          response.data.data.periodoJogo == 'Não Inic.'
            ? response.data.data.dataDaPartidaIso != null
              ? this.isoToDate(response.data.data.dataDaPartidaIso) +
                ' ' +
                response.data.data.dataDaPartidaIso
                  .split('T')[1]
                  .substring(0, 5)
              : 'Data indefinida'
            : response.data.data.periodoJogo ?? '',

        dataRealizacao:
          response.data.data.dataDaPartidaIso != null
            ? this.isoToDate(response.data.data.dataDaPartidaIso) +
                ' ' +
                response.data.data.dataDaPartidaIso
                  .split('T')[1]
                  .substring(0, 5) ?? ''
            : 'Data indefinida',
        dateOriginal: response.data.data.dataDaPartidaIso,
        arbitro: response.data.data.arbitro ?? '',
        publico: response.data.data.publico ?? 0,
        renda: response.data.data.renda ?? 0,
      };

      const equipeMandante = await this.equipe(
        response.data.data.idEquipeMandante,
      );

      const equipeVisitante = await this.equipe(
        response.data.data.idEquipeVisitante,
      );

      partida.mandante =
        equipeMandante.nome == 'Red Bull Bragantino'
          ? 'RB Bragantino'
          : equipeMandante.nome;
      partida.logoMandante = equipeMandante.logo;
      partida.visitante =
        equipeVisitante.nome == 'Red Bull Bragantino'
          ? 'RB Bragantino'
          : equipeVisitante.nome;
      partida.logoVisitante = equipeVisitante.logo;

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(partida)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando partida');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async partidasHoje(): Promise<Futebol.Partida[]> {
    this.logger.debug('partidas de hoje: ');

    try {
      const url = `${this.apiFutebolV1Url}/partidas/hoje`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      await Promise.all(
        response.data.data.map(async (obj) => {
          if (obj.id > 0) {
            const partida: Futebol.Partida = await this.partida(obj.id);
            retorno.push(partida);
          }
        }),
      );

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando partidas de hoje');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async equipe(equipeId: number): Promise<Futebol.Equipe> {
    this.logger.debug('equipe Id: ', equipeId);

    try {
      const url = `${this.apiFutebolV1Url}/equipes/${equipeId}`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const equipe: Futebol.Equipe = {
        id: response.data.data.id,
        nome: response.data.data.nome,
        sigla: response.data.data.sigla,
        estadio: response.data.data.estadio,
        tecnico: response.data.data.tecnico,
        urlLogo: response.data.data.urlLogo,
        logo: this.globalService.dirLogo + response.data.data.nome + '.png',
      };

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(equipe)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando equipe');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async equipeAtletas(equipeId: number): Promise<Futebol.Atleta[]> {
    this.logger.debug('equipe atletas: ', equipeId);

    try {
      const url = `${this.apiFutebolV1Url}/teams/${equipeId}/players`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      await Promise.all(
        response.data.data.map((obj) => {
          const data: Futebol.Atleta = {
            id: obj.id,
            posicao: obj.position,
            name: obj.nickname,
            numero: obj.jerseyNumber,
            altura: obj.heightMts,
            peso: obj.weightKgs,
            nome_completo: obj.name,
            time: obj.team,
            url:
              process.env.URL_API +
              'scout/visitante/atleta/' +
              obj.id.toString(),
          };
          retorno.push(data);
        }),
      );

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando equipe atletas');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async classificacao(
    filter: Futebol.OptionsPartida,
  ): Promise<Futebol.Classificacao[]> {
    this.logger.debug('classificação: ', filter);

    try {
      const url = `${this.apiFutebolV2Url}/Campeonato/obter-classificacao?Token=${this.token}&Championship=${filter.campeonatoId}`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L'];

      let grupoIndex = 0;
      let countEquipe = 0;

      const retorno = [];
      response.data.forEach((obj) => {
        if (countEquipe == 4 && obj.posicao == 1) {
          countEquipe = 0;
          grupoIndex = grupoIndex + 1;
        }

        countEquipe = countEquipe + 1;

        const data = {
          grupo: obj.grupo,
          grupoLetra: letras[grupoIndex],
          posicao: obj.posicao,
          time: obj.equipe,
          logo: filter.dirLogo + obj.equipe + '.png',
          pontos: obj.pontos,
          jogos: obj.jogos ?? 0,
          vitorias: obj.vitorias ?? 0,
          empates: obj.empates ?? 0,
          derrotas: obj.derrotas,
          gols_pro: obj.golsPro ?? 0,
          gols_contra: obj.golsContra ?? 0,
          saldoDeGols: obj.saldoGols ?? 0,
          aproveitamento: obj.aproveitamento ?? 0,
        } as Futebol.Classificacao;
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando classificação');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async classificacaoByGrupo(
    grupoId: string,
  ): Promise<Futebol.Classificacao[]> {
    this.logger.debug('classificação por grupo: ', grupoId);

    try {
      const url = `${this.apiFutebolV2Url}/Campeonato/obter-classificacao?Token=${this.token}&Championship=${this.globalService.campeonatoId}`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L'];

      let grupoIndex = 0;
      let countEquipe = 0;
      const retorno = [];

      response.data.forEach((obj) => {
        if (countEquipe == 4 && obj.posicao == 1) {
          countEquipe = 0;
          grupoIndex = grupoIndex + 1;
        }

        countEquipe = countEquipe + 1;

        if (letras[grupoIndex] == grupoId) {
          const data = {
            grupo: obj.grupo,
            grupoLetra: letras[grupoIndex],
            posicao: obj.posicao,
            time: obj.equipe,
            logo: this.globalService.dirLogo + obj.equipe + '.png',
            pontos: obj.pontos,
            jogos: obj.jogos ?? 0,
            vitorias: obj.vitorias ?? 0,
            empates: obj.empates ?? 0,
            derrotas: obj.derrotas,
            gols_pro: obj.golsPro ?? 0,
            gols_contra: obj.golsContra ?? 0,
            saldoDeGols: obj.saldoGols ?? 0,
            aproveitamento: obj.aproveitamento ?? 0,
          } as Futebol.Classificacao;

          retorno.push(data);
        }
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando classificação por grupo');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async artilharia(
    filter: Futebol.OptionsPartida,
  ): Promise<Futebol.Artilharia[]> {
    this.logger.debug('artilharia: ', filter);

    try {
      const url = `${this.apiFutebolV1Url}/campeonatos/${filter.campeonatoId}/artilharia`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      response.data.data.forEach((obj) => {
        const data = {
          atleta: obj.jogador,
          time: obj.equipe,
          logo: filter.dirLogo + obj.equipe + '.png',
          gols: obj.gols ?? 0,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando artilharia');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async rodadaByGroup(
    rodadaId: number,
    group: string,
  ): Promise<Futebol.Partida[]> {
    this.logger.debug('rodada por grupo: ', group);

    try {
      const url = `${this.apiFutebolV1Url}/campeonatos/${this.globalService.campeonatoId}/partidas/rodada/${rodadaId}`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      await Promise.all(
        response.data.data.map(async (obj) => {
          if (obj.id > 0) {
            const partida: Futebol.Partida = await this.partida(obj.id);
            retorno.push(partida);
          }
        }),
      );

      retorno.sort(function (a, b) {
        return Date.parse(a.dateOriginal) - Date.parse(b.dateOriginal);
      });

      const retornoTratado: Futebol.Partida[] = [];

      retorno.forEach((obj) => {
        if (obj.grupo === group) {
          retornoTratado.push(obj);
        }
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retornoTratado)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando rodada por id');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async rodadaById(rodadaId: number): Promise<Futebol.Partida[]> {
    this.logger.debug('rodada por id: ', rodadaId);

    try {
      const url = `${this.apiFutebolV1Url}/campeonatos/${this.globalService.campeonatoId}/partidas/rodada/${rodadaId}`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      await Promise.all(
        response.data.data.map(async (obj) => {
          if (obj.id > 0) {
            const partida: Futebol.Partida = await this.partida(obj.id);
            retorno.push(partida);
          }
        }),
      );

      retorno.sort(function (a, b) {
        return Date.parse(a.dateOriginal) - Date.parse(b.dateOriginal);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando rodada por id');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async scoutAtletas(): Promise<any> {
    this.logger.debug('scout Atletas: ');

    try {
      const url = `${this.apiFutebolV1Url}/partidas/${this.globalService.partidaId}/jogadores/scout`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(response)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando scout Atletas');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async scoutAtleta(jogadorId: number): Promise<Futebol.ScoutJogador[]> {
    this.logger.debug('scoutJogador: ', jogadorId);

    if (!this.globalService.campeonatoId) {
      throw new NotFoundException('Nenhum campeonato foi definido');
    }

    if (!this.globalService.partidaId) {
      throw new NotFoundException('Nenhuma partida foi definida');
    }

    try {
      const url = `${this.apiFutebolV2Url}/Partida/obter-scout-jogador?Token=${this.token}
      &Championship=${this.globalService.campeonatoId}
      &idMatch=${this.globalService.partidaId}
      &idTeam=${jogadorId}`;

      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      response.data.forEach((obj) => {
        const data: Futebol.ScoutJogador = {
          idJogador: obj.idPlayer,
          foto:
            process.env.DIR_IMAGES_SCOUT + obj.idJogador.toString() + '.png',
          heatmap:
            process.env.DIR_IMAGES_HEATMAP + obj.idJogador.toString() + '.png',
          nome: process.env.DIR_IMAGES_NOME + obj.idJogador.toString() + '.png',
          name: obj.nickname,
          gols: obj.gols,
          golContra: obj.golContra,
          assistencia: obj.assistenciaGol,
          finalizacaos: obj.finalizacaoCerta + obj.finalizacaoErrada,
          finalizacaoNoGol: obj.finalizacaoCerta,
          passeCerto: obj.passeCerto,
          passesErrado: obj.passeErrado,
          totalPasses: obj.passeCerto + obj.passeErrado,
          dribleCerto: obj.dribleCerto,
          faltaCometida: obj.totalFalta,
          faltaRecebida: obj.faltaRecebida,
          cartaoAmarelos: obj.cartaoAmarelo,
          segundoCartaoAmarelo: obj.segundoCartaoAmarelo,
          cartaoVermelhos: obj.cartaoVermlho,
          desarmes: obj.desarmeCerto,
          interceptacao: obj.interceptacaoCerta,
          impedimentos: obj.impedimento,
          cruzamentoCerto: obj.cruzamentoCerto,
          cruzamentoErrado: obj.cruzamentoErrado,
          totalcruzamento: obj.cruzamentoCerto + obj.cruzamentoErrado,
          lancamentoCerto: obj.lacamentoCerto,
          lancamentoErrado: obj.lancamentoErrado,
          totallancamentos: obj.lacamentoCerto + obj.lancamentoErrado,
          defesaDificil: obj.defesaDificil,
          golSofrido: obj.goalAgainst,
          penaltiDefendido: obj.penalTyDefendido,
          penaltiRecebido: obj.penaltiSofrido,
          penaltiCometido: obj.penaltiCometido,
          idEquipe: obj.idTeam,
          idPartida: this.globalService.partidaId,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando scoutEquipe');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async scoutEquipe(
    filter: Futebol.OptionsPartida,
  ): Promise<Futebol.ScoutEquipe[]> {
    this.logger.debug('scoutEquipe: ', filter);

    try {
      const url = `${this.apiFutebolV2Url}/Partida/obter-scout-time?Token=${this.token}
      &Championship=${filter.campeonatoId}
      &idMatch=${filter.partidaId}
      &idTeam=${filter.equipeId}`;

      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      const totalpossebola =
        response.data[0].posseDeBola + response.data[0].posseDeBola;

      const posse = response.data[0].percentualPosseBola.replace('%', '');
      const posseBolaMandante = Math.round(posse);
      response.data.forEach((obj) => {
        const data = {
          idPartida: filter.partidaId,
          finalizacaos: obj.finalizacaoCerta + obj.finalizacaoErrada ?? 0,
          finalizacaoNoGol: obj.finalizacaoCerta ?? 0,
          finalizacaoErrada: obj.finalizacaoErrada ?? 0,
          passes: obj.passeCerto + obj.passeErrado ?? 0,
          passeCerto: obj.passeCerto ?? 0,
          passeErrado: obj.passeErrado ?? 0,
          desarmes: obj.desarmeCerto ?? 0,
          desarmeCerto: obj.desarmeCerto ?? 0,
          desarmeErrado: obj.desarmeErrado ?? 0,
          possebola: posseBolaMandante + '%' ?? '0 %',
          faltas: obj.faltaCometida ?? 0,
          cartaoAmarelos: obj.cartaoAmarelo ?? 0,
          cartaoVermelhos: obj.cartaoVermelho ?? 0,          
          impedimentos: obj.impedimento ?? 0,
          lancamentos: obj.lancamentoCerto + obj.lancamentoErrado ?? 0,
          lancamentosCertos: obj.lancamentoCerto ?? 0,
          escanteios: obj.escanteioPro ?? 0,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando scoutEquipe');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async escalacao(
    filter: Futebol.OptionsPartida,
  ): Promise<Futebol.Escalacao[]> {
    this.logger.debug('escalação: ', filter);

    try {
      const url = `${this.apiFutebolV2Url}/Partida/obter-escalacao?Token=${this.token}
      &Championship=${filter.campeonatoId}
      &idMatch=${filter.partidaId}
      &idTeam=${filter.equipeId}`;

      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      // const totalpossebola =
      //   response.data[0].posseDeBola + response.data[0].posseDeBola;
      // const posseBolaMandante = Math.round(
      //   (response.data[0].posseDeBola / totalpossebola) * 100,
      // );
      response.data.forEach((obj) => {
        const data = {
          id: obj.idJogador,
          nome: obj.jogador,
          numero: obj.camisa,
          cartaoAmarelo: obj.cartaoAmarelo ?? 0,
          cartaoVermelho: obj.cartaoVermelho ?? 0,
          time: obj.time,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando scount Equipe');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async substituicao(
    filter: Futebol.OptionsPartida,
  ): Promise<Futebol.Substituicao[]> {
    this.logger.debug('substituicao: ', filter);

    try {
      const url = `${this.apiFutebolV2Url}/Partida/obter-substituicoes?Token=${this.token}
      &Championship=${filter.campeonatoId}
      &idMatch=${filter.partidaId}
      &idTeam=${filter.equipeId}`;

      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      response.data.forEach((obj) => {
        const data = {
          idPartida: filter.partidaId,
          idEquipe: filter.equipeId,
          camisaSubstituido: obj.camisaSubstituido,
          jogadorSubstuido: obj.jogadorSubstuido,
          camisaJogadorEmCampo: obj.camisaJogadorEmCampo,
          jogadorEmCampo: obj.jogadorEmCampo,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando substituicao Equipe');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async mensagens(filter: Futebol.OptionsPartida): Promise<Futebol.Mensagem[]> {
    this.logger.debug('mensagens: ', filter);

    try {
      const url = `${this.apiFutebolV2Url}/Partida/obter-mensagens?Token=${this.token}
      &Championship=${filter.campeonatoId}
      &idMatch=${filter.partidaId}`;

      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      response.data.forEach((obj) => {
        const data = {
          texto: obj.texto,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando mensagens da partida');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async heatmap(equipeId: number): Promise<Futebol.Heatmap[]> {
    this.logger.debug('heatmap por equipe: ', equipeId);

    try {
      const url = `${this.apiFutebolV1Url}/partidas/${this.globalService.partidaId}/equipes/${equipeId}/heatmap`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      response.data.data.forEach((obj) => {
        const data: Futebol.Heatmap = {
          idEquipe: obj.idEquipe,
          x: obj.x,
          y: obj.y,
          valor: 1,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando heatmap por equipe');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  async heatmapJodador(jogadorId: number): Promise<Futebol.Heatmap[]> {
    this.logger.debug('heatmap por jogador: ', jogadorId);

    try {
      const url = `${this.apiFutebolV1Url}/partidas/${this.globalService.partidaId}/jogadores/${jogadorId}/heatmap`;
      this.logger.debug('URL: ', url);

      const request = this.httpService.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          useQueryString: true,
        },
      });

      const response = await lastValueFrom(request);

      const retorno = [];
      response.data.data.forEach((obj) => {
        const data: Futebol.Heatmap = {
          idEquipe: obj.idEquipe,
          jogador: obj.player,
          x: obj.x,
          y: obj.y,
          valor: 1,
        };
        retorno.push(data);
      });

      return this.nestResponseBuilder
        .setStatus(response.status)
        .setBody(retorno)
        .build().body;
    } catch (error: any) {
      this.logger.error('Error: puxando heatmap por jogador');
      this.logger.error(error.message);
      throw new NestResponseException(error);
    }
  }

  isoToDate(str): string {
    const date = new Date(str);
    const year = date.getFullYear();
    const imonth = date.getMonth() + 1;
    const idt = date.getDate();
    let smonth;
    let sdt = idt.toString();
    if (idt < 10) {
      sdt = '0' + idt.toString();
    }
    smonth = imonth.toString();
    if (imonth < 10) {
      smonth = '0' + imonth.toString();
    }
    return sdt + '/' + smonth + '/' + year;
  }
}
