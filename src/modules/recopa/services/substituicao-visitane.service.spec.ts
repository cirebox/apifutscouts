import { Test, TestingModule } from "@nestjs/testing";
import { SubstituicaoVisitaneService } from "./substituicao-visitane.service";

describe("SubstituicaoVisitaneService", () => {
  let service: SubstituicaoVisitaneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubstituicaoVisitaneService],
    }).compile();

    service = module.get<SubstituicaoVisitaneService>(
      SubstituicaoVisitaneService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
