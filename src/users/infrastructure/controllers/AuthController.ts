// infrastructure/controllers/AuthController.ts

import { Request, Response } from 'express';
import { AuthService } from '../../../users/application/services/AuthService';
import { EventEmitter } from '../events/EventEmitter';
import { LoginAttemptEvent } from '../../domain/events/LoginAttempEvents';

export class AuthController {
  private loginAttempts: { [username: string]: number } = {};

  constructor(
    private authService: AuthService,
    private eventEmitter: EventEmitter
  ) {
    this.eventEmitter.on<LoginAttemptEvent>('loginAttempt', this.handleLoginAttempt.bind(this));
  }

  private handleLoginAttempt(event: LoginAttemptEvent) {
    if (!event.success) {
      this.loginAttempts[event.username] = (this.loginAttempts[event.username] || 0) + 1;
    } else {
      delete this.loginAttempts[event.username];
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    const attempts = this.loginAttempts[username] || 0;

    try {
      const token = await this.authService.login(username, password);

      if (!token) {
        this.loginAttempts[username] = attempts + 1;
        if (this.loginAttempts[username] >= 3) {
          res.status(403).json({ error: 'No estás autorizado a entrar al programa', attemptsLeft: 0 });
        } else {
          res.status(401).json({ error: 'Invalid credentials', attemptsLeft: 3 - this.loginAttempts[username] });
        }
        return;
      }

      delete this.loginAttempts[username];
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  }
}