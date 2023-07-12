import { Test, TestingModule } from '@nestjs/testing';
import { ScoutMandanteAtletasService } from './scout-mandante-atletas.service';

describe('ScoutMandanteAtletasService', () => {
  let service: ScoutMandanteAtletasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutMandanteAtletasService],
    }).compile();

    service = module.get<ScoutMandanteAtletasService>(ScoutMandanteAtletasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
