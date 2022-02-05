import { AppError } from "../../../../shared/errors/AppError";
import { DayjsDateProvider } from "../../../../shared/infra/providers/date/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/infra/providers/mail/in-memory/MailProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/usersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/inMemory/usersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("SendForgotPasswordMailUseCase", () => {
   beforeEach(async () => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
      dateProvider = new DayjsDateProvider();
      mailProvider = new MailProviderInMemory();

      sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
         usersRepositoryInMemory,
         usersTokensRepositoryInMemory,
         dateProvider,
         mailProvider
      );
   });

   it("Should be able to send a email for a user to reset his password", async () => {
      const sendMail = jest.spyOn(mailProvider, "sendMail");

      await usersRepositoryInMemory.create({
         username: "faos",
         driver_license: "123sla",
         email: "faos@gmail.com",
         name: "Luis F.A.O.S",
         password: "test",
      });
      await sendForgotPasswordMailUseCase.execute("faos@gmail.com");

      expect(sendMail).toHaveBeenCalled();
   });

   it("Should not be able to send a email for an inexistent user", async () => {
      const sendMail = jest.spyOn(mailProvider, "sendMail");

      await expect(
         sendForgotPasswordMailUseCase.execute("INVALID@email.uu")
      ).rejects.toEqual(new AppError("User doesn't exists!"));

      expect(sendMail).not.toBeCalled();
   });

   it("Should be able to create a new token to reset password", async () => {
      const generatedToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

      await usersRepositoryInMemory.create({
         username: "faos",
         driver_license: "123slaDNV",
         email: "faos@gmail.com",
         name: "Luis F.A.O.S",
         password: "test",
      });
      await sendForgotPasswordMailUseCase.execute("faos@gmail.com");

      expect(generatedToken).toHaveBeenCalled();
   });
});