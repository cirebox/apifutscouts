import { Test, TestingModule } from "@nestjs/testing";
import { ArtilhariaService } from "./artilharia.service";

describe("ArtilhariaService", () => {
  let service: ArtilhariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtilhariaService],
    }).compile();

    service = module.get<ArtilhariaService>(ArtilhariaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
