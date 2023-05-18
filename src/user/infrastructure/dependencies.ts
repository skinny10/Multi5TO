import { SenderEmailUseCase } from "../application/SenderEmailUseCase";
import { FakeEmailSender } from "./FakeEmailSender";
import { MemoryUserRepository } from "./MemoryUSerRepository";
import { UserController } from "./UserController";

const fakeEmailSender = new FakeEmailSender();
const memoryUserRepository = new MemoryUserRepository();
export const senderEmailUseCase = new SenderEmailUseCase(
  memoryUserRepository,
  fakeEmailSender
);
export const userController = new UserController(senderEmailUseCase);
