import { Request, Response } from "express";

import { SenderEmailUseCase } from "../application/SenderEmailUseCase";

export class UserController {
  constructor(readonly senderEmailUseCase: SenderEmailUseCase) {}

  async run(req: Request, res: Response) {
    const userId = req.params.id;

    await this.senderEmailUseCase.run(userId);
    res.status(200).send();
  }
}
