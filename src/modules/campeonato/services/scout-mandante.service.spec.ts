import { Test, TestingModule } from '@nestjs/testing';
import { ScoutMandanteService } from './scout-mandante.service';

describe('ScoutMandanteService', () => {
  let service: ScoutMandanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutMandanteService],
    }).compile();

    service = module.get<ScoutMandanteService>(ScoutMandanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
