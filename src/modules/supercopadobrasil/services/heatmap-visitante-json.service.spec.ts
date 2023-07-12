import { Test, TestingModule } from '@nestjs/testing';
import { HeatmapVisitanteJsonService } from './heatmap-visitante-json.service';

describe('HeatmapVisitanteJsonService', () => {
  let service: HeatmapVisitanteJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatmapVisitanteJsonService],
    }).compile();

    service = module.get<HeatmapVisitanteJsonService>(HeatmapVisitanteJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
