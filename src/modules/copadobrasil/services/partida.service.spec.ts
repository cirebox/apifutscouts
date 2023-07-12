import { Test, TestingModule } from '@nestjs/testing';
import { PartidaService } from './partida.service';

describe('PartidaService', () => {
  let service: PartidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartidaService],
    }).compile();

    service = module.get<PartidaService>(PartidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
