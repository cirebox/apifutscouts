import { Test, TestingModule } from '@nestjs/testing';
import { EscalacaoVisitanteService } from './escalacao-visitante.service';

describe('EscalacaoVisitanteService', () => {
  let service: EscalacaoVisitanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscalacaoVisitanteService],
    }).compile();

    service = module.get<EscalacaoVisitanteService>(EscalacaoVisitanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
