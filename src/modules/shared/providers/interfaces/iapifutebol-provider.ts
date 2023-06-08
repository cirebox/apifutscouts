export interface IAPIFutebolProvider {
  campeonatos(): Promise<Futebol.Campeonato[]>;
  partidasHoje(): Promise<Futebol.Partida[]>;
  partida(partidaId: number): Promise<Futebol.Partida>;
  equipe(equipeId: number): Promise<Futebol.Equipe>;
  equipeAtletas(equipeId: number): Promise<Futebol.Atleta[]>;
  classificacao(
    filter: Futebol.OptionsPartida,
  ): Promise<Futebol.Classificacao[]>;
  classificacaoByGrupo(grupoId: string): Promise<Futebol.Classificacao[]>;
  artilharia(filter: Futebol.OptionsPartida): Promise<Futebol.Artilharia[]>;
  rodadaById(rodadaId: number): Promise<Futebol.Partida[]>;
  rodadaByGroup(rodadaId: number, group: string): Promise<Futebol.Partida[]>;
  scoutEquipe(filter: Futebol.OptionsPartida): Promise<Futebol.ScoutEquipe[]>;
  scoutAtleta(jogadorId: number): Promise<Futebol.ScoutJogador[]>;
  scoutAtletas(): Promise<any>;
  escalacao(filter: Futebol.OptionsPartida): Promise<Futebol.Escalacao[]>;
  substituicao(filter: Futebol.OptionsPartida): Promise<Futebol.Substituicao[]>;
  heatmap(equipeId: number): Promise<Futebol.Heatmap[]>;
  heatmapJodador(jogadorId: number): Promise<Futebol.Heatmap[]>;
  mensagens(filter: Futebol.OptionsPartida): Promise<Futebol.Mensagem[]>;
}
