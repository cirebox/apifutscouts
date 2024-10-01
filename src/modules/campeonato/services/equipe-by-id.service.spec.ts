import { Test, TestingModule } from "@nestjs/testing";
import { EquipeByIdService } from "./equipe-by-id.service";

describe("EquipeByIdService", () => {
  let service: EquipeByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipeByIdService],
    }).compile();

    service = module.get<EquipeByIdService>(EquipeByIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
