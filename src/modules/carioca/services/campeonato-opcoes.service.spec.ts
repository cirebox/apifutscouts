import { Test, TestingModule } from '@nestjs/testing';
import { CampeonatoOpcoesService } from './campeonato-opcoes.service';

describe('CampeonatoOpcoesService', () => {
  let service: CampeonatoOpcoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampeonatoOpcoesService],
    }).compile();

    service = module.get<CampeonatoOpcoesService>(CampeonatoOpcoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
