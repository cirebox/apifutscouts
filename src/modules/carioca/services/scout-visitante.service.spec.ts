import { Test, TestingModule } from "@nestjs/testing";
import { ScoutVisitanteService } from "./scout-visitante.service";

describe("ScoutVisitanteService", () => {
  let service: ScoutVisitanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutVisitanteService],
    }).compile();

    service = module.get<ScoutVisitanteService>(ScoutVisitanteService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
