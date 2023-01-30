declare namespace Futebol {
  interface OptionsPartida {
    campeonatoId: number;
    campeonato?: string;
    campeonatoSlug?: string;
    rodadaId?: number;
    partidaId?: number;
    equipeId?: number;
    equipeMandanteId?: number;
    equipeVisitanteId?: number;
    atletaId?: number;
    mandanteAtletas?: Atleta[];
    visitanteAtletas?: Atleta[];
    dirLogo?: string;
  }

  interface Info {
    hora: number;
    campeonatoId: number;
    campeonato: string;
    campeonatoSlug: string;
    rodadaId: number;
    equipeDefault: string;
    partidaId: number;
    mandanteId: number;
    visitanteId: number;
    dirLogo: string;
    optionsCampeonato: string;
    activeCampeonato: string;
    info: string;
    partida: string;
    partidasDeHoje: string;
    classificacao: string;
    equipeById: string;
    equipeMandante: string;
    equipeVisitante: string;
    artilharia: string;
    rodada: string;
    rodadaPorId: string;
    visitanteEscalacao: string;
    MandanteEscalacao: string;
    visitanteSubstituicao: string;
    MandanteSubstituicao: string;
    scoutTimeVisitante: string;
    scoutTimeMadante: string;
    scoutJogadorVisitantePorId: string;
    scoutJogadorMadantePorId: string;
    mapaDeCalorVisitante: string;
    mapaDeCalorMandante: string;
    mapaDeCalorJogadorPorId: string;
    scoutJogador: string;
  }

  interface Campeonato {
    id?: number;
    nome: string;
    apelido: string;
    slug: string;
    urlLogo?: string;
    temporada: number;
    categoria: string;
    temClassificacao: boolean;
    temClassificacaoPorGrupo: boolean;
    rodadaAtual: number;
    quantidadeDeRodadas: number;
    quantidadeDeEquipes: number;
    ativo: boolean;
  }

  interface Equipe {
    id: number;
    nome: string;
    logo: string;
    sigla: string;
    tecnico: string;
    estadio: string;
    urlLogo: string;
  }

  interface Atleta {
    id: number;
    posicao: string;
    name: string;
    numero: string;
    time: string;
    altura: any;
    peso: any;
    nome_completo: string;
    url?: string;
  }

  interface Classificacao {
    grupo?: number;
    posicao: number;
    time: string;
    logo: string;
    pontos: number;
    jogos: number;
    empates: number;
    derrotas: number;
    gols_pro: number;
    gols_contra: number;
    saldoDeGols: number;
    aproveitamento: number;
  }

  interface Artilharia {
    id?: number;
    atleta: string;
    time: string;
    logo: string;
    gols: number;
  }

  interface Rodada {
    id?: number;
    partidaId: number;
    rodada: string;
    campeonato: string;
    campeonato_nome_popular: string;
    fase_atual: string;
    grupo: string;
    placar: string;
    idmandante: number;
    idvisitante: number;
    mandante: string;
    visitante: string;
    logoMandante: string;
    logoVisitante: string;
    golsMandante: number;
    golsVisitante: number;
    status: string;
    estadio: string;
    periodo: string;
    data_realizacao: string;
    arbitro: string;
    publico: number;
    renda: number;
  }

  interface ScoutEquipe {
    idPartida?: number;
    finalizacaos: number;
    finalizacaoNoGol: number;
    possebola: number;
    passes: number;
    faltas: number;
    cartaoAmarelos: number;
    cartaoVermelhos: number;
    desarmes: number;
    impedimentos: number;
    lancamentos: number;
    lancamentosCertos: number;
    escanteios: number;
  }

  interface ScoutJogador {
    idJogador: number;
    foto: string;
    heatmap: string;
    nome: string;
    name: string;
    posicao?: string;
    numero?: string;
    gols: number;
    golContra: number;
    assistencia: number;
    finalizacaos: number;
    finalizacaoNoGol: number;
    passeCerto: number;
    passesErrado: number;
    totalPasses: number;
    dribleCerto: number;
    possebola?: string;
    viradaDeJogoCerta?: number;
    viradaDeJogoErrada?: number;
    totalViradadeJogo?: number;
    faltaCometida: number;
    faltaRecebida: number;
    cartaoAmarelos: number;
    segundoCartaoAmarelo?: number;
    cartaoVermelhos: number;
    desarmes: number;
    interceptacao: number;
    impedimentos: number;
    cruzamentoCerto: number;
    cruzamentoErrado: number;
    totalcruzamento: number;
    lancamentoCerto: number;
    lancamentoErrado: number;
    totallancamentos: number;
    defesaDificil: number;
    golSofrido: number;
    penaltiDefendido: number;
    penaltiRecebido: number;
    penaltiCometido: number;
    idEquipe: number;
    idPartida: number;
  }

  interface Escalacao {
    id?: number;
    numero: string;
    nome: string;
    cartaoAmarelo: string;
    cartaoVermelho: number;
    time: number;
  }

  interface Substituicao {
    idPartida?: number;
    idEquipe: number;
    camisaSubstituido: string;
    jogadorSubstuido: number;
    camisaJogadorEmCampo: number;
    jogadorEmCampo: number;
  }

  interface Mensagem {
    texto: string;
  }

  interface Partida {
    partidaId: number;
    rodada: number;
    campeonato: string;
    campeonato_nome_popular: string;
    faseAtual: string;
    grupo: string;
    placar: string;
    mandanteId: number;
    visitanteId: number;
    mandante: string;
    visitante: string;
    logoMandante: string;
    logoVisitante: string;
    golsMandante: number;
    golsVisitante: number;
    periodo: string;
    status: string;
    estadio: string;
    dataRealizacao: string;
    arbitro: string;
    publico: number;
    renda: number;
  }

  interface Heatmap {
    idEquipe: number;
    jogador?: string;
    x: number;
    y: number;
    valor: number;
  }
}
