import { Test, TestingModule } from "@nestjs/testing";
import { HeatmapMadanteJsonService } from "./heatmap-madante-json.service";

describe("HeatmapMadanteJsonService", () => {
  let service: HeatmapMadanteJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatmapMadanteJsonService],
    }).compile();

    service = module.get<HeatmapMadanteJsonService>(HeatmapMadanteJsonService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
