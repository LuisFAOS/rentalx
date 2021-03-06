import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { IDateProvider } from "../IDateProvider"

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
   dateNow: Date
   
   constructor(){
      this.dateNow = dayjs().toDate()
   }

   convertToUTC(date: any): Date {
      return dayjs(date).utc().local().toDate()
   }
   
   async compareInHours(start_date: Date, end_date: Date): Promise<number> {
      const start_date_utc = this.convertToUTC(start_date)
      const end_date_utc = this.convertToUTC(end_date)

      return dayjs(end_date_utc).diff(start_date_utc, "hours")
   }

   async compareInDays(start_date: Date, end_date: Date): Promise<number> {
      const start_date_utc = this.convertToUTC(start_date)
      const end_date_utc = this.convertToUTC(end_date)

      return dayjs(end_date_utc).diff(start_date_utc, "days")
   }

   addDays(days: number): Date {
      return dayjs().add(days, "days").toDate()    
   }

   addHours(hours: number): Date {
      return dayjs().add(hours, "hours").toDate()
   }

   compareIfBefore(start_date: Date, end_date: Date): Boolean {
      return dayjs(start_date).isBefore(end_date)
   }
}