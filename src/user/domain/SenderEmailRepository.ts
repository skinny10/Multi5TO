export interface SenderEmailRepository {
  send(email: string, msn: string): Promise<void>;
}
