type EventHandler<T> = (event: T) => void;

export class EventEmitter {
  private handlers: { [eventName: string]: EventHandler<any>[] } = {};

  on<T>(eventName: string, handler: EventHandler<T>) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  emit<T>(eventName: string, event: T) {
    const eventHandlers = this.handlers[eventName];
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(event));
    }
  }
}