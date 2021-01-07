import { getShortsterPipe } from '@modules/shortsters/pipes/getShortster.pipe';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShortsterStatsUseCase } from './ShortsterStatsUseCase';

export class ShortsterStatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = await getShortsterPipe(request.params);

    const shortsterStatsUseCase = container.resolve(ShortsterStatsUseCase);

    const shortster = await shortsterStatsUseCase.execute(code);

    return response.json(shortster);
  }
}
