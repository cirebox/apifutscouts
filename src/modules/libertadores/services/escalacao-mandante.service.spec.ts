import { Test, TestingModule } from '@nestjs/testing';
import { EscalacaoMandanteService } from './escalacao-mandante.service';

describe('EscalacaoMandanteService', () => {
  let service: EscalacaoMandanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscalacaoMandanteService],
    }).compile();

    service = module.get<EscalacaoMandanteService>(EscalacaoMandanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
