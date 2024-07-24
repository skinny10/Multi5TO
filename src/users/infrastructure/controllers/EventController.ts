import { Request, Response } from 'express';
import { SaveEventUseCase } from '../../../users/application/useCase/SaveEventUseCase';

export class EventController {
  constructor(private saveEventUseCase: SaveEventUseCase) {}

  async saveEvent(req: Request, res: Response) {
    try {
      const event = await this.saveEventUseCase.execute({
        type: req.body.type,
        details: req.body.details,
        timestamp: new Date()
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el evento' });
    }
  }
}