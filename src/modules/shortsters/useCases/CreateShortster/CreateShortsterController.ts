import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateShortsterUseCase } from './CreateShortsterUseCase';

export class CreateShortsterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { url, code, user_id } = request.body.createShortsterDTO;

    const createShortsterUseCase = container.resolve(CreateShortsterUseCase);

    const shortster = await createShortsterUseCase.execute({
      url,
      code,
      user_id,
    });

    return response.json(shortster);
  }
}
