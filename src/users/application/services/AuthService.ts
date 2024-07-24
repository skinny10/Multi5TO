
import { IuserRepository } from "../../domain/repositories/IUserRepository";
import { LoginAttemptEvent } from "../../domain/events/LoginAttempEvents";
import { EventEmitter } from "../../../users/infrastructure/events/EventEmitter";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(
        private userRepository: IuserRepository,
        private eventEmitter: EventEmitter
    ) {}

    async login(username: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            this.emitLoginAttempt(username, false);
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            this.emitLoginAttempt(username, false);
            return null;
        }

        this.emitLoginAttempt(username, true);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        return token;
    }

    private emitLoginAttempt(username: string, success: boolean) {
        const event: LoginAttemptEvent = { username, success };
        this.eventEmitter.emit('loginAttempt', event);
    }
}