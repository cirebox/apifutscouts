import { Test, TestingModule } from "@nestjs/testing";
import { HeatmapAtletaByIdService } from "./heatmap-atleta-by-id.service";

describe("HeatmapAtletaByIdService", () => {
  let service: HeatmapAtletaByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatmapAtletaByIdService],
    }).compile();

    service = module.get<HeatmapAtletaByIdService>(HeatmapAtletaByIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
