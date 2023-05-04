import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacaoByGrupoService } from './classificacao-by-grupo.service';

describe('ClassificacaoByGrupoService', () => {
  let service: ClassificacaoByGrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificacaoByGrupoService],
    }).compile();

    service = module.get<ClassificacaoByGrupoService>(ClassificacaoByGrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
