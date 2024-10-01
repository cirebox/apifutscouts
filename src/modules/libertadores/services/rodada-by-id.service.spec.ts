import { Test, TestingModule } from "@nestjs/testing";
import { RodadaByIdService } from "./rodada-by-id.service";

describe("RodadaByIdService", () => {
  let service: RodadaByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RodadaByIdService],
    }).compile();

    service = module.get<RodadaByIdService>(RodadaByIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
