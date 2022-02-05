import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer"
import Handlebars from "handlebars";
import fs from "fs"

export class EtherealMailProvider implements IMailProvider {
   private client: Transporter

   constructor() {
      nodemailer.createTestAccount()
         .then(account => {
            const transporter = nodemailer.createTransport({
               host: account.smtp.host,
               port: account.smtp.port,
               secure: account.smtp.secure,
               auth: {
                  user: account.user,
                  pass: account.pass
               }
            })

            this.client = transporter
         })
         .catch(err => console.error(`error while sending email: ${err}`))
   }

   async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
      const templateFileContent = fs.readFileSync(path).toString("utf-8")
      const templateParse = Handlebars.compile(templateFileContent)
      const templateHTML = templateParse(variables)

      const message = await this.client.sendMail({
         to,
         from: "Rentx <noreplay@rentx-app.com.br>",
         subject,
         html: templateHTML,
      })

      console.log("Message sent: %s", message.messageId)
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message))
   }
   
}