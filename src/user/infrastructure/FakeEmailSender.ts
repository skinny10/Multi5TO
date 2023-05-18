import { SenderEmailRepository } from "../domain/SenderEmailRepository";
export class FakeEmailSender implements SenderEmailRepository {
  async send(email: string, msn: string): Promise<void> {
    console.log(`Simulating email to ${email}`);
  }
}
