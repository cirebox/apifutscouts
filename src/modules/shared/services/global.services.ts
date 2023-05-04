export class GlobalService implements Futebol.OptionsPartida {
  campeonatoId: number;
  campeonato: string;
  campeonatoSlug: string;
  grupoId?: string;
  rodadaId?: number;
  partidaId?: number;
  equipeId?: number;
  equipeMandanteId?: number;
  equipeVisitanteId?: number;
  atletaId?: number;
  mandanteAtletas?: Futebol.Atleta[];
  visitanteAtletas?: Futebol.Atleta[];
  dirLogo?: string;

  clear() {
    this.campeonatoId = undefined;
    this.campeonato = undefined;
    this.campeonatoSlug = undefined;
    this.grupoId = undefined;
    this.rodadaId = undefined;
    this.partidaId = undefined;
    this.equipeId = undefined;
    this.equipeMandanteId = undefined;
    this.equipeVisitanteId = undefined;
    this.atletaId = undefined;
    this.mandanteAtletas = undefined;
    this.visitanteAtletas = undefined;
    this.dirLogo = undefined;
  }
}
