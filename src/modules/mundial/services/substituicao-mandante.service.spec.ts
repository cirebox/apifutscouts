import { Test, TestingModule } from '@nestjs/testing';
import { SubstituicaoMandanteService } from './substituicao-mandante.service';

describe('SubstituicaoMandanteService', () => {
  let service: SubstituicaoMandanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubstituicaoMandanteService],
    }).compile();

    service = module.get<SubstituicaoMandanteService>(SubstituicaoMandanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
