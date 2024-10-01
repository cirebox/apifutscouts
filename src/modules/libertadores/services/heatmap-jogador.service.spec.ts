import { Test, TestingModule } from "@nestjs/testing";
import { HeatmapJogadorService } from "./heatmap-jogador.service";

describe("HeatmapJogadorService", () => {
  let service: HeatmapJogadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatmapJogadorService],
    }).compile();

    service = module.get<HeatmapJogadorService>(HeatmapJogadorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
