import { Test, TestingModule } from '@nestjs/testing';
import { HeatmapVisitanteService } from './heatmap-visitante.service';

describe('HeatmapVisitanteService', () => {
  let service: HeatmapVisitanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatmapVisitanteService],
    }).compile();

    service = module.get<HeatmapVisitanteService>(HeatmapVisitanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
