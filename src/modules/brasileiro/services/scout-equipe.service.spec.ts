import { Test, TestingModule } from '@nestjs/testing';
import { ScoutEquipeService } from './scout-equipe.service';

describe('ScoutEquipeService', () => {
  let service: ScoutEquipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutEquipeService],
    }).compile();

    service = module.get<ScoutEquipeService>(ScoutEquipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
