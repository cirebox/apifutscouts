import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CampeonatoOpcoesService {
  private readonly logger = new Logger(CampeonatoOpcoesService.name);

  async execute(): Promise<string[]> {
    return [
      'carioca',
      'brasileiro',
      'libertadores',
      'supercopa-do-brasil',
      'copa-do-brasil',
      'mundial',
      'recopa',
      'sulamericana',
    ];
  }
}
