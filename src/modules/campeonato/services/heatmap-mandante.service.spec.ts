import { Test, TestingModule } from '@nestjs/testing';
import { HeatmapMandanteService } from './heatmap-mandante.service';

describe('HeatmapMandanteService', () => {
  let service: HeatmapMandanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatmapMandanteService],
    }).compile();

    service = module.get<HeatmapMandanteService>(HeatmapMandanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
