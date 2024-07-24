import { Event } from '../../domain/entities/Event';
import { EventRepository } from '../../domain/repositories/EventRepository';

export class SaveEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async execute(event: Omit<Event, 'id'>): Promise<Event> {
    return this.eventRepository.save(event);
  }
}