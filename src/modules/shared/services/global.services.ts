export class GlobalService implements Futebol.OptionsPartida {
  campeonatoId: number;
  campeonato: string;
  campeonatoSlug: string;
  rodadaId?: number;
  partidaId?: number;
  equipeId?: number;
  equipeMandanteId?: number;
  equipeVisitanteId?: number;
  atletaId?: number;
  mandanteAtletas?: Futebol.Atleta[];
  visitanteAtletas?: Futebol.Atleta[];
  dirLogo?: string;
}
