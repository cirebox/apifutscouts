import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IAPIFutebolProvider } from "src/modules/shared/providers/interfaces/iapifutebol-provider";
import { GlobalService } from "src/modules/shared/services/global.services";

@Injectable()
export class ScoutMandanteAtletasService {
  constructor(
    private readonly globalService: GlobalService,
    @Inject("IAPIFutebolProvider")
    private readonly apiFutebolProvider: IAPIFutebolProvider,
  ) { }

  private readonly logger = new Logger(ScoutMandanteAtletasService.name);

  async execute(): Promise<Futebol.ScoutJogador[]> {
    try {
      if (!this.globalService.campeonatoId) {
        throw new NotFoundException("Nenhum campeonato foi definido");
      }

      if (!this.globalService.partidaId) {
        throw new NotFoundException("Nenhuma partida foi definida");
      }

      if (!this.globalService.equipeId) {
        throw new NotFoundException("Nenhuma equipe foi definida");
      }

      const response = await this.apiFutebolProvider.scoutAtletas();

      const retorno = [];
      await Promise.all(
        response.data.data.equipeMandante.map((obj) => {
          const jogador = this.globalService.mandanteAtletas.filter(
            (value) => value.id === obj.idJogador,
          )[0];

          let posicao = "Desconhecido";
          let nome = "Desconhecido";
          let numero = "Desconhecido";
          if (jogador) {
            posicao = jogador.posicao;
            nome = jogador.name;
            numero = jogador.numero;
          }

          const data: Futebol.ScoutJogador = {
            idJogador: obj.idJogador,
            foto:
              process.env.DIR_IMAGES_SCOUT + obj.idJogador.toString() + ".png",
            heatmap:
              process.env.DIR_IMAGES_HEATMAP +
              obj.idJogador.toString() +
              ".png",
            nome:
              process.env.DIR_IMAGES_NOME + obj.idJogador.toString() + ".png",
            posicao: posicao,
            name: nome,
            numero: numero,
            gols: obj.golPro,
            golContra: obj.golContra,
            assistencia: obj.assistencia,
            finalizacaos: obj.finalizacaoCerta + obj.finalizacaoErrada,
            finalizacaoNoGol: obj.finalizacaoCerta,
            passeCerto: obj.passeCerto,
            passesErrado: obj.passeErrado,
            totalPasses: obj.passeCerto + obj.passeErrado,
            possebola: obj.posseDeBola + "%",
            dribleCerto: obj.dribleCerto,
            faltaCometida: obj.faltaCometida,
            faltaRecebida: obj.faltaRecebida,
            cartaoAmarelos: obj.cartaoAmarelo,
            cartaoVermelhos: obj.cartaoVermelho,
            desarmes: obj.desarmeCerto,
            interceptacao: obj.interceptacaoCerta,
            impedimentos: obj.impedimento,
            cruzamentoCerto: obj.cruzamentoCerto,
            cruzamentoErrado: obj.cruzamentoErrado,
            totalcruzamento: obj.cruzamentoCerto + obj.cruzamentoErrado,
            lancamentoCerto: obj.lancamentoCerto,
            lancamentoErrado: obj.lancamentoErrado,
            totallancamentos: obj.lancamentoCerto + obj.lancamentoErrado,
            viradaDeJogoCerta: obj.viradaDeJogoCerta,
            viradaDeJogoErrada: obj.viradaDeJogoErrada,
            totalViradadeJogo: obj.viradaDeJogoCerta + obj.viradaDeJogoErrada,
            defesaDificil: obj.defesaDificil,
            golSofrido: obj.golSofrido,
            penaltiDefendido: obj.penaltiDefendido,
            penaltiRecebido: obj.penaltiRecebido,
            penaltiCometido: obj.penaltiCometido,
            idEquipe: obj.idEquipe,
            idPartida: obj.idPartida,
          };
          retorno.push(data);
        }),
      );
      return retorno;
    } catch (error) {
      this.logger.error("Erro ao puxar scout de atletas mandante");
      console.log(error);
      throw error;
    }
  }
}
