export interface IDateProvider {
   dateNow: Date 
   compareInHours(start_date: Date, end_date: Date): Promise<number>
   convertToUTC(date: Date): Date | string
   compareInDays(start_date: Date, end_date: Date): Promise<number>
   addDays(days: number): Date
   addHours(hours: number): Date
   compareIfBefore(start_date: Date, end_date: Date): Boolean
}