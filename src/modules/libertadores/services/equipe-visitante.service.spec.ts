import { Test, TestingModule } from "@nestjs/testing";
import { EquipeVisitanteService } from "./equipe-visitante.service";

describe("EquipeVisitanteService", () => {
  let service: EquipeVisitanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipeVisitanteService],
    }).compile();

    service = module.get<EquipeVisitanteService>(EquipeVisitanteService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
