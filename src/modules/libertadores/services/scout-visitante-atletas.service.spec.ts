import { Test, TestingModule } from '@nestjs/testing';
import { ScoutVisitanteAtletasService } from './scout-visitante-atletas.service';

describe('ScoutVisitanteAtletasService', () => {
  let service: ScoutVisitanteAtletasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutVisitanteAtletasService],
    }).compile();

    service = module.get<ScoutVisitanteAtletasService>(ScoutVisitanteAtletasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
