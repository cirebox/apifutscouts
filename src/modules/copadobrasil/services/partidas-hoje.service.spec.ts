import { Test, TestingModule } from '@nestjs/testing';
import { PartidasHojeService } from './partidas-hoje.service';

describe('PartidasHojeService', () => {
  let service: PartidasHojeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartidasHojeService],
    }).compile();

    service = module.get<PartidasHojeService>(PartidasHojeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
