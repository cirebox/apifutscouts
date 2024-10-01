import { Test, TestingModule } from "@nestjs/testing";
import { EquipeMandanteService } from "./equipe-mandante.service";

describe("EquipeMandanteService", () => {
  let service: EquipeMandanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipeMandanteService],
    }).compile();

    service = module.get<EquipeMandanteService>(EquipeMandanteService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
