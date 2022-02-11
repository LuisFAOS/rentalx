import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer"
import {SES} from "aws-sdk"
import Handlebars from "handlebars";
import fs from "fs"

export class SESMailProvider implements IMailProvider {
   private client: Transporter

   constructor() {
      this.client = nodemailer.createTransport({
         SES: new SES({
            apiVersion: "2010-12-11",
            region: process.env.AWS_REGION,
         })
      })
   }

   async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
      const templateFileContent = fs.readFileSync(path).toString("utf-8")
      const templateParse = Handlebars.compile(templateFileContent)
      const templateHTML = templateParse(variables)

      await this.client.sendMail({
         to,
         from: "Rentx <luis.faos@luisfaos.com>",
         subject,
         html: templateHTML,
      })
   }
   
}