import { Test, TestingModule } from '@nestjs/testing';
import { ActiveCampeonatoService } from './active-campeonato.service';

describe('ActiveCampeonatoService', () => {
  let service: ActiveCampeonatoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveCampeonatoService],
    }).compile();

    service = module.get<ActiveCampeonatoService>(ActiveCampeonatoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
