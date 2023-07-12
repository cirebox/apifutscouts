import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacaoService } from './classificacao.service';

describe('ClassificacaoService', () => {
  let service: ClassificacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificacaoService],
    }).compile();

    service = module.get<ClassificacaoService>(ClassificacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
