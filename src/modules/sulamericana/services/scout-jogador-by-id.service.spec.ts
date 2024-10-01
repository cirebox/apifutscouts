import { Test, TestingModule } from "@nestjs/testing";
import { ScoutJogadorByIdService } from "./scout-jogador-by-id.service";

describe("ScoutJogadorByIdService", () => {
  let service: ScoutJogadorByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutJogadorByIdService],
    }).compile();

    service = module.get<ScoutJogadorByIdService>(ScoutJogadorByIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
