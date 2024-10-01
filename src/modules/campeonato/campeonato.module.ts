import { Module } from "@nestjs/common";
import { CampeonatoController } from "./controllers/campeonato.controller";
import { ClassificacaoService } from "./services/classificacao.service";
import { SharedModule } from "../shared/shared.module";
import { ArtilhariaService } from "./services/artilharia.service";
import { ScoutEquipeService } from "./services/scout-equipe.service";
import { ScoutMandanteService } from "./services/scout-mandante.service";
import { ScoutVisitanteService } from "./services/scout-visitante.service";
import { SubstituicaoMandanteService } from "./services/substituicao-mandante.service";
import { SubstituicaoVisitaneService } from "./services/substituicao-visitane.service";
import { MensagensService } from "./services/mensagens.service";
import { InfoService } from "./services/info.service";
import { ActiveCampeonatoService } from "./services/active-campeonato.service";
import { CampeonatoOpcoesService } from "./services/campeonato-opcoes.service";
import { PartidasHojeService } from "./services/partidas-hoje.service";
import { EquipeByIdService } from "./services/equipe-by-id.service";
import { EquipeMandanteService } from "./services/equipe-mandante.service";
import { EquipeVisitanteService } from "./services/equipe-visitante.service";
import { RodadaByIdService } from "./services/rodada-by-id.service";
import { EscalacaoMandanteService } from "./services/escalacao-mandante.service";
import { EscalacaoVisitanteService } from "./services/escalacao-visitante.service";
import { ScoutJogadorByIdService } from "./services/scout-jogador-by-id.service";
import { HeatmapVisitanteJsonService } from "./services/heatmap-visitante-json.service";
import { HeatmapMadanteJsonService } from "./services/heatmap-madante-json.service";
import { HeatmapAtletaByIdService } from "./services/heatmap-atleta-by-id.service";
import { PartidaService } from "./services/partida.service";
import { HeatmapJogadorService } from "./services/heatmap-jogador.service";
import { ScoutMandanteAtletasService } from "./services/scout-mandante-atletas.service";
import { ScoutVisitanteAtletasService } from "./services/scout-visitante-atletas.service";
import { CampeonatosService } from "./services/campeonatos.service";
import { ClassificacaoByGrupoService } from "./services/classificacao-by-grupo.service";
import { RodadaByGroupService } from "./services/rodada-by-group.service";

@Module({
  imports: [SharedModule],
  controllers: [CampeonatoController],
  providers: [
    ClassificacaoService,
    ArtilhariaService,
    ScoutEquipeService,
    ScoutMandanteService,
    ScoutVisitanteService,
    SubstituicaoMandanteService,
    SubstituicaoVisitaneService,
    MensagensService,
    InfoService,
    ActiveCampeonatoService,
    CampeonatoOpcoesService,
    PartidasHojeService,
    EquipeByIdService,
    EquipeMandanteService,
    EquipeVisitanteService,
    RodadaByIdService,
    EscalacaoMandanteService,
    EscalacaoVisitanteService,
    ScoutJogadorByIdService,
    HeatmapVisitanteJsonService,
    HeatmapMadanteJsonService,
    HeatmapAtletaByIdService,
    PartidaService,
    HeatmapJogadorService,
    ScoutMandanteAtletasService,
    ScoutVisitanteAtletasService,
    CampeonatosService,
    ClassificacaoByGrupoService,
    RodadaByGroupService,
  ],
})
export class CampeonatoModule {}
