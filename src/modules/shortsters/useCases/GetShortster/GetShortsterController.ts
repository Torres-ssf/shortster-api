import { getShortsterPipe } from '@modules/shortsters/pipes/getShortster.pipe';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetShortsterUseCase } from './GetShortsterUseCase';

export class GetShortsterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = await getShortsterPipe(request.params);

    const getShortsterUseCase = container.resolve(GetShortsterUseCase);

    const shortster = await getShortsterUseCase.execute(code);

    return response.json(shortster);
  }
}
