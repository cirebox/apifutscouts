import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ActiveCampeonatoService } from 'src/modules/campeonato/services/active-campeonato.service';
import { ArtilhariaService } from 'src/modules/campeonato/services/artilharia.service';
import { CampeonatosService } from 'src/modules/campeonato/services/campeonatos.service';
import { ClassificacaoByGrupoService } from 'src/modules/campeonato/services/classificacao-by-grupo.service';
import { ClassificacaoService } from 'src/modules/campeonato/services/classificacao.service';
import { EquipeByIdService } from 'src/modules/campeonato/services/equipe-by-id.service';
import { EquipeMandanteService } from 'src/modules/campeonato/services/equipe-mandante.service';
import { EquipeVisitanteService } from 'src/modules/campeonato/services/equipe-visitante.service';
import { EscalacaoMandanteService } from 'src/modules/campeonato/services/escalacao-mandante.service';
import { EscalacaoVisitanteService } from 'src/modules/campeonato/services/escalacao-visitante.service';
import { HeatmapAtletaByIdService } from 'src/modules/campeonato/services/heatmap-atleta-by-id.service';
import { HeatmapJogadorService } from 'src/modules/campeonato/services/heatmap-jogador.service';
import { HeatmapMadanteJsonService } from 'src/modules/campeonato/services/heatmap-madante-json.service';
import { HeatmapVisitanteJsonService } from 'src/modules/campeonato/services/heatmap-visitante-json.service';
import { InfoService } from 'src/modules/campeonato/services/info.service';
import { MensagensService } from 'src/modules/campeonato/services/mensagens.service';
import { PartidaService } from 'src/modules/campeonato/services/partida.service';
import { PartidasHojeService } from 'src/modules/campeonato/services/partidas-hoje.service';
import { RodadaByGroupService } from 'src/modules/campeonato/services/rodada-by-group.service';
import { RodadaByIdService } from 'src/modules/campeonato/services/rodada-by-id.service';
import { ScoutEquipeService } from 'src/modules/campeonato/services/scout-equipe.service';
import { ScoutJogadorByIdService } from 'src/modules/campeonato/services/scout-jogador-by-id.service';
import { ScoutMandanteAtletasService } from 'src/modules/campeonato/services/scout-mandante-atletas.service';
import { ScoutMandanteService } from 'src/modules/campeonato/services/scout-mandante.service';
import { ScoutVisitanteAtletasService } from 'src/modules/campeonato/services/scout-visitante-atletas.service';
import { ScoutVisitanteService } from 'src/modules/campeonato/services/scout-visitante.service';
import { SubstituicaoMandanteService } from 'src/modules/campeonato/services/substituicao-mandante.service';
import { SubstituicaoVisitaneService } from 'src/modules/campeonato/services/substituicao-visitane.service';

@ApiTags('libertadores')
@Controller('libertadores')
export class HttpController {
  constructor(
    private readonly activeCampeonatoService: ActiveCampeonatoService,
    private readonly infoService: InfoService,
    private readonly partidaService: PartidaService,
    private readonly partidasHojeService: PartidasHojeService,
    private readonly equipeByIdService: EquipeByIdService,
    private readonly equipeMandanteService: EquipeMandanteService,
    private readonly equipeVisitanteService: EquipeVisitanteService,
    private readonly classificacaoService: ClassificacaoService,
    private readonly classificacaoByGrupoService: ClassificacaoByGrupoService,
    private readonly artilhariaService: ArtilhariaService,
    private readonly rodadaByIdService: RodadaByIdService,
    private readonly rodadaByGroupService: RodadaByGroupService,
    private readonly scoutEquipeService: ScoutEquipeService,
    private readonly scoutMandanteService: ScoutMandanteService,
    private readonly scoutVisitanteService: ScoutVisitanteService,
    private readonly scoutJogadorByIdService: ScoutJogadorByIdService,
    private readonly scoutMandanteAtletasService: ScoutMandanteAtletasService,
    private readonly scoutVisitanteAtletasService: ScoutVisitanteAtletasService,
    private readonly escalacaoMandanteService: EscalacaoMandanteService,
    private readonly escalacaoVisitanteService: EscalacaoVisitanteService,
    private readonly substituicaoMandanteService: SubstituicaoMandanteService,
    private readonly substituicaoVisitaneService: SubstituicaoVisitaneService,
    private readonly heatmapMadanteJsonService: HeatmapMadanteJsonService,
    private readonly heatmapVisitanteJsonService: HeatmapVisitanteJsonService,
    private readonly heatmapAtletaByIdService: HeatmapAtletaByIdService,
    private readonly heatmapJogadorService: HeatmapJogadorService,
    private readonly campeonatosService: CampeonatosService,
    private readonly mensagensService: MensagensService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiQuery({ name: 'teste', type: 'boolean', required: false })
  @Get('active')
  async active(
    @Query('teste') teste = 'false',
  ): Promise<Futebol.OptionsPartida> {
    return await this.activeCampeonatoService.execute('libertadores', teste);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('info')
  async info(): Promise<Futebol.Info> {
    return await this.infoService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('partida')
  async partida(): Promise<Futebol.Partida[]> {
    return await this.partidaService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('partidas/hoje')
  async partidasHoje(): Promise<Futebol.Partida[]> {
    return await this.partidasHojeService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('classificacao')
  async classificacao(): Promise<Futebol.Classificacao[]> {
    return await this.classificacaoService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'grupoId', type: 'String', required: true })
  @Get('classificacao/:grupoId')
  async classificacaoByGrupo(
    @Param('grupoId') grupoId: string,
  ): Promise<Futebol.Classificacao[]> {
    return await this.classificacaoByGrupoService.execute(grupoId);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'equipeId', type: 'number', required: true })
  @Get('equipe/id/:equipeId')
  async equipeById(
    @Param('equipeId') equipeId: number,
  ): Promise<Futebol.Equipe> {
    return await this.equipeByIdService.execute(equipeId);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('equipe/mandante')
  async equipeMandante(): Promise<Futebol.Equipe> {
    return await this.equipeMandanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('equipe/visitante')
  async equipeVisitante(): Promise<Futebol.Equipe> {
    return await this.equipeVisitanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('artilharia')
  async artilharia(): Promise<Futebol.Artilharia[]> {
    return await this.artilhariaService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'rodada', type: 'number', required: true })
  @Get('rodada/:rodada')
  async rodada(@Param('rodada') rodada: number): Promise<Futebol.Partida[]> {
    return await this.rodadaByIdService.execute(rodada);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'rodada', type: 'number', required: true })
  @ApiParam({ name: 'grupo', type: 'String', required: true })
  @Get('rodada/:rodada/grupo/:grupo')
  async rodadaPorGrupo(
    @Param('rodada') rodada: number,
    @Param('grupo') grupo: string,
  ): Promise<Futebol.Partida[]> {
    return await this.rodadaByGroupService.execute(rodada, grupo);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @Get('scout/equipe/:id')
  async scoutEquipe(@Param('id') id: number): Promise<Futebol.ScoutEquipe[]> {
    return await this.scoutEquipeService.execute(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('scout/mandante')
  async scoutMandante(): Promise<Futebol.ScoutEquipe[]> {
    return await this.scoutMandanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('scout/visitante')
  async scoutVisitante(): Promise<Futebol.ScoutEquipe[]> {
    return await this.scoutVisitanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @Get('scout/mandante/atleta/:id')
  async scoutJogadorMandante(
    @Param('id') id: number,
  ): Promise<Futebol.ScoutJogador[]> {
    return await this.scoutJogadorByIdService.execute(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @Get('scout/visitante/atleta/:id')
  async scoutJogadorVisitante(
    @Param('id') id: number,
  ): Promise<Futebol.ScoutJogador[]> {
    return await this.scoutJogadorByIdService.execute(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('scout/mandante/atleta/')
  async scoutMandanteAtleta(): Promise<Futebol.ScoutJogador[]> {
    return await this.scoutMandanteAtletasService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('scout/visitante/atleta/')
  async scoutVisitanteAtleta(): Promise<Futebol.ScoutJogador[]> {
    return await this.scoutVisitanteAtletasService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('escalacao/mandante')
  async escalacaoMandante(): Promise<Futebol.Escalacao[]> {
    return await this.escalacaoMandanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('escalacao/visitante')
  async escalacaoVisitante(): Promise<Futebol.Escalacao[]> {
    return await this.escalacaoVisitanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('substituicao/mandante')
  async substituicaoMandante(): Promise<Futebol.Substituicao[]> {
    return await this.substituicaoMandanteService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('substituicao/visitante')
  async substituicaoVisitante(): Promise<Futebol.Substituicao[]> {
    return await this.substituicaoVisitaneService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('heatmap/mandantejson/')
  async heatmapMandantejson(): Promise<Futebol.Heatmap[]> {
    return await this.heatmapMadanteJsonService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('heatmap/visitantejson/')
  async heatmapVisitantejson(): Promise<Futebol.Heatmap[]> {
    return await this.heatmapVisitanteJsonService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @ApiParam({ name: 'jogador', type: 'number', required: true })
  @Get('heatmap/atleta/:jogador')
  async heatmapAtleta(
    @Param('jogador') jogador: number,
    @Res() res,
  ): Promise<Futebol.Heatmap[]> {
    await this.heatmapAtletaByIdService.execute(jogador);
    return res.redirect(
      `${process.env.URL_STORAGE}/heatmap/campeonato/jogador.html`,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('heatmap/jogador/')
  async heatmapJogador(): Promise<Futebol.Heatmap[]> {
    return await this.heatmapJogadorService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('heatmap/mandante/')
  async heatmapMandante(@Res() res): Promise<Futebol.Heatmap[]> {
    return res.redirect(
      `${process.env.URL_STORAGE}/heatmap/campeonato/mandante.html`,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('heatmap/visitante/')
  async heatmapVisitante(@Res() res): Promise<Futebol.Heatmap[]> {
    return res.redirect(
      `${process.env.URL_STORAGE}/heatmap/campeonato/visitante.html`,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('campeonatos')
  async campeonatos(): Promise<Futebol.Campeonato[]> {
    return await this.campeonatosService.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'Ok. the request was successfully completed.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request. The request was invalid.',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description:
      'Unauthorized. The request did not include an authentication token or the authentication token was expired.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description:
      'Forbidden. The client did not have permission to access the requested resource.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  @Get('mensagens')
  async mensagens(): Promise<Futebol.Mensagem[]> {
    return await this.mensagensService.execute();
  }
}
