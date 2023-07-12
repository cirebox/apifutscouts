import { Test, TestingModule } from '@nestjs/testing';
import { RodadaByGroupService } from './rodada-by-group.service';

describe('RodadaByGroupService', () => {
  let service: RodadaByGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RodadaByGroupService],
    }).compile();

    service = module.get<RodadaByGroupService>(RodadaByGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
