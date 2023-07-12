import { Test, TestingModule } from '@nestjs/testing';
import { CampeonatosService } from './campeonatos.service';

describe('CampeonatosService', () => {
  let service: CampeonatosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampeonatosService],
    }).compile();

    service = module.get<CampeonatosService>(CampeonatosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
